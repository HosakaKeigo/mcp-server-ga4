import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import type { z } from "zod";

/**
 * Zodスキーマから型を抽出するユーティリティ型
 */
export type InferZodParams<T extends Record<string, z.ZodType>> = {
  [K in keyof T]: T[K] extends z.ZodOptional<infer U> ?
    z.infer<U> | undefined :
    T[K] extends z.ZodDefault<infer V> ?
      z.infer<V> :
      z.infer<T[K]>;
};

/**
 * MCPツールのインターフェース
 */
export interface IMCPTool<TParams extends Record<string, z.ZodType> = Record<string, z.ZodType>> {
  /**
   * ツール名
   */
  readonly name: string;

  /**
   * ツールの説明
   */
  readonly description: string;

  /**
   * パラメータの定義
   */
  readonly parameters: TParams;

  /**
   * ツールを実行する
   * @param args パラメータ
   * @returns 実行結果
   */
  execute(args: InferZodParams<TParams>): Promise<{
    content: TextContent[];
    isError?: boolean;
  }>;
}

/**
 * MCPリソースのインターフェース
 */
export interface IMCPResource {
  /**
   * リソース名
   */
  readonly name: string;

  /**
   * リソースURI
   */
  readonly uri: string;

  /**
   * リソースハンドラー
   */
  handler(uri: URL): Promise<{
    contents: {
      uri: string;
      text?: string;
      blob?: string;
      mimeType?: string;
    }[];
  }>;
}

/**
 * MCPプロンプトのインターフェース
 */
export interface IMCPPrompt<TParams extends Record<string, z.ZodType> = Record<string, z.ZodType>> {
  /**
   * プロンプト名
   */
  readonly name: string;

  /**
   * パラメータの定義
   */
  readonly schema: TParams;

  /**
   * プロンプトハンドラー
   */
  handler(args: InferZodParams<TParams>): {
    messages: {
      role: string;
      content: {
        type: string;
        text: string;
      };
    }[];
  };
}
