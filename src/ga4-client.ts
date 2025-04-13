import { BetaAnalyticsDataClient } from '@google-analytics/data';
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
      throw new Error('Missing required environment variables for GA4 client');
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
   */
  async runReport(config: any) {
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
   */
  async getPageViews(startDate: string, endDate: string, dimensions: string[] = ['page']) {
    console.error(`Getting page views from ${startDate} to ${endDate} with dimensions:`, dimensions);

    // dimensions配列の各要素をチェック
    const validDimensions = dimensions.filter(dim => dim && typeof dim === 'string');

    if (validDimensions.length === 0) {
      console.error('No valid dimensions provided, using default "pageLocation" dimension');
      validDimensions.push('pageLocation');
    }

    return this.runReport({
      dateRanges: [{ startDate, endDate }],
      dimensions: validDimensions.map((dimension) => ({ name: dimension })),
      metrics: [{ name: 'screenPageViews' }],
    });
  }

  /**
   * アクティブユーザー指標取得
   */
  async getActiveUsers(startDate: string, endDate: string) {
    return this.runReport({
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }],
      dimensions: [{ name: 'date' }],
    });
  }

  /**
   * イベント指標取得
   */
  async getEvents(startDate: string, endDate: string, eventName?: string) {
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

    return this.runReport(config);
  }

  /**
   * ユーザー行動指標取得
   */
  async getUserBehavior(startDate: string, endDate: string) {
    return this.runReport({
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'sessionsPerUser' },
      ],
      dimensions: [{ name: 'date' }],
    });
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
