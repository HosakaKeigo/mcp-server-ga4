import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from '@google-analytics/data/build/protos/protos.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * GA4データクライアントの初期化と管理を行うクラス
 */
export class GA4Client {
  private client: BetaAnalyticsDataClient;
  private propertyId: string;

  /**
   * GA4クライアントのコンストラクタ
   * 環境変数から認証情報とプロパティIDを取得
   */
  constructor() {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    this.propertyId = process.env.GA_PROPERTY_ID || '';

    if (!clientEmail || !privateKey || !this.propertyId) {
      console.error('Missing required environment variables:');
      console.error('- GOOGLE_CLIENT_EMAIL:', clientEmail ? 'Set' : 'Missing');
      console.error('- GOOGLE_PRIVATE_KEY:', privateKey ? 'Set' : 'Missing');
      console.error('- GA_PROPERTY_ID:', this.propertyId ? 'Set' : 'Missing');
      throw new Error('Missing required environment variables for GA4 client. Please check .env file.');
    }

    try {
      this.client = new BetaAnalyticsDataClient({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
      });
      console.error('GA4 client initialized successfully with property ID:', this.propertyId);
    } catch (error) {
      console.error('Failed to initialize GA4 client:', error);
      throw error;
    }
  }

  /**
   * レポート実行のためのヘルパーメソッド
   * GA4 APIは一度に全データを取得するため、クライアント側でページネーションを実装
   */
  async runReport(config: google.analytics.data.v1beta.IRunReportRequest) {
    try {
      const formattedConfig = {
        ...config,
        property: `properties/${this.propertyId}`,
      };

      console.error('Running GA4 report with config:', JSON.stringify(formattedConfig, null, 2));

      const [response] = await this.client.runReport(formattedConfig);
      return response;
    } catch (error) {
      console.error('Error running GA4 report:', error);
      throw error;
    }
  }

  /**
   * ページビュー指標取得
   * @param startDate 開始日
   * @param endDate 終了日
   * @param dimensions ディメンション配列
   * @param limit 結果の最大行数
   * @param offset 開始オフセット
   */
  async getPageViews(
    startDate: string, 
    endDate: string, 
    dimensions: string[] = ['hostName'],
    limit?: number,
    offset?: number
  ) {
    console.error(`Getting page views from ${startDate} to ${endDate} with dimensions:`, 
      dimensions, `(limit: ${limit}, offset: ${offset})`);
    
    // dimensions配列の各要素をチェック
    const validDimensions = dimensions.filter(dim => dim && typeof dim === 'string');
    
    if (validDimensions.length === 0) {
      console.error('No valid dimensions provided, using default "hostName" dimension');
      validDimensions.push('hostName');
    }
    
    // GA4 APIではlimitが指定されている場合、設定
    const requestConfig: any = {
      dateRanges: [{ startDate, endDate }],
      dimensions: validDimensions.map((dimension) => ({ name: dimension })),
      metrics: [{ name: 'screenPageViews' }],
    };

    // GA4 APIがrowLimitパラメータをサポートしている場合
    if (limit && limit > 0) {
      requestConfig.limit = limit;
    }
    
    return this.runReport(requestConfig);
  }

  /**
   * アクティブユーザー指標取得
   * @param startDate 開始日
   * @param endDate 終了日
   * @param limit 結果の最大行数
   * @param offset 開始オフセット
   */
  async getActiveUsers(startDate: string, endDate: string, limit?: number, offset?: number) {
    console.error(`Getting active users from ${startDate} to ${endDate} (limit: ${limit}, offset: ${offset})`);
    
    const requestConfig: any = {
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }],
      dimensions: [{ name: 'date' }],
    };

    // GA4 APIがrowLimitパラメータをサポートしている場合
    if (limit && limit > 0) {
      requestConfig.limit = limit;
    }
    
    return this.runReport(requestConfig);
  }

  /**
   * イベント指標取得
   * @param startDate 開始日
   * @param endDate 終了日
   * @param eventName イベント名（オプション）
   * @param limit 結果の最大行数
   * @param offset 開始オフセット
   */
  async getEvents(
    startDate: string, 
    endDate: string, 
    eventName?: string,
    limit?: number,
    offset?: number
  ) {
    console.error(`Getting events from ${startDate} to ${endDate}` +
      `${eventName ? ` for event: ${eventName}` : ''} (limit: ${limit}, offset: ${offset})`);
    
    const config: any = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'eventName' }, { name: 'date' }],
      metrics: [{ name: 'eventCount' }],
    };

    if (eventName) {
      config.dimensionFilter = {
        filter: {
          fieldName: 'eventName',
          stringFilter: { value: eventName },
        },
      };
    }

    // GA4 APIがrowLimitパラメータをサポートしている場合
    if (limit && limit > 0) {
      config.limit = limit;
    }

    return this.runReport(config);
  }

  /**
   * ユーザー行動指標取得
   * @param startDate 開始日
   * @param endDate 終了日
   * @param limit 結果の最大行数
   * @param offset 開始オフセット
   */
  async getUserBehavior(startDate: string, endDate: string, limit?: number, offset?: number) {
    console.error(`Getting user behavior from ${startDate} to ${endDate} (limit: ${limit}, offset: ${offset})`);
    
    const config: any = {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'sessionsPerUser' },
      ],
      dimensions: [{ name: 'date' }],
    };

    // GA4 APIがrowLimitパラメータをサポートしている場合
    if (limit && limit > 0) {
      config.limit = limit;
    }

    return this.runReport(config);
  }

  /**
   * プロパティ情報取得（メタデータ）
   */
  async getPropertyMetadata() {
    try {
      const [metadata] = await this.client.getMetadata({
        name: `properties/${this.propertyId}/metadata`,
      });
      return metadata;
    } catch (error) {
      console.error('Error getting GA4 property metadata:', error);
      throw error;
    }
  }
}
