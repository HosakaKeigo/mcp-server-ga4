export const GA4_METRICS = `| API 名                              | 説明                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------- |
| active1DayUsers                     | 1日以内利用の個別アクティブユーザー数（最終日含む）                    |
| active28DayUsers                    | 28日以内利用の個別アクティブユーザー数（最終日含む）                   |
| active7DayUsers                     | 7日以内利用の個別アクティブユーザー数（最終日含む）                    |
| activeUsers                         | サイト/アプリアクセスの個別ユーザー数                                  |
| adUnitExposure                      | 広告ユニット表示時間（ミリ秒）                                         |
| addToCarts                          | カートへのアイテム追加回数                                             |
| advertiserAdClicks                  | 広告クリック数（統合クリック含む）                                     |
| advertiserAdCost                    | 広告費用合計（統合費用含む）                                           |
| advertiserAdCostPerClick            | 広告クリック単価（CPC）                                                |
| advertiserAdCostPerKeyEvent         | 1キーイベントあたりの広告費用                                          |
| advertiserAdImpressions             | 広告表示回数（統合表示含む）                                           |
| averagePurchaseRevenue              | 平均購入収益（トランザクショングループ）                               |
| averagePurchaseRevenuePerPayingUser | 有料ユーザー平均購入収益 (ARPPU)                                       |
| averagePurchaseRevenuePerUser       | ユーザーあたり平均購入収益                                             |
| averageRevenuePerUser               | アクティブユーザー平均収益 (ARPU)                                      |
| averageSessionDuration              | 平均セッション継続時間（秒）                                           |
| bounceRate                          | 直帰率（小数）                                                         |
| cartToViewRate                      | 表示後カート追加率（小数）                                             |
| checkouts                           | 決済開始回数（begin_checkoutイベント）                                 |
| cohortActiveUsers                   | コホート期間内のアクティブユーザー数                                   |
| cohortTotalUsers                    | コホート内総ユーザー数（期間選択後減少）                               |
| crashAffectedUsers                  | クラッシュ報告ユーザー数                                               |
| crashFreeUsersRate                  | クラッシュなしユーザー割合（小数）                                     |
| dauPerMau                           | 30日間中1日利用率（小数）                                              |
| dauPerWau                           | 7日間中1日利用率（小数）                                               |
| ecommercePurchases                  | 完了した購入数（purchaseイベント）                                     |
| engagedSessions                     | エンゲージメントセッション数（10秒超/キーイベント/≥2スクリーンビュー） |
| engagementRate                      | エンゲージメント率（小数）                                             |
| eventCount                          | イベント総数                                                           |
| eventCountPerUser                   | ユーザーあたり平均イベント数                                           |
| eventValue                          | イベントvalueパラメータ合計                                            |
| eventsPerSession                    | セッションあたり平均イベント数                                         |
| firstTimePurchaserRate              | 初回購入者率（小数）                                                   |
| firstTimePurchasers                 | 初回購入者数                                                           |
| firstTimePurchasersPerNewUser       | 新規ユーザーあたり初回購入者平均数                                     |
| grossItemRevenue                    | アイテム総収益（税・送料・払い戻し除く）                               |
| grossPurchaseRevenue                | 購入による総収益（purchase等）                                         |
| itemDiscountAmount                  | アイテム割引額（discountパラメータ）                                   |
| itemListClickEvents                 | アイテムリストクリックイベント数 (select_item)                         |
| itemListClickThroughRate            | アイテムリストクリック率（小数）                                       |
| itemListViewEvents                  | アイテムリストビューイベント数 (view_item_list)                        |
| itemPromotionClickThroughRate       | プロモーションクリック率（小数）                                       |
| itemRefundAmount                    | アイテム払い戻し額（refundイベント）                                   |
| itemRevenue                         | アイテム収益（購入収益-払い戻し）                                      |
| itemViewEvents                      | アイテムビューイベント数 (view_item)                                   |
| itemsAddedToCart                    | カートに追加されたアイテム数（add_to_cart内）                          |
| itemsCheckedOut                     | 決済されたアイテム数（begin_checkout内）                               |
| itemsClickedInList                  | リスト内クリックアイテム数 (select_item)                               |
| itemsClickedInPromotion             | プロモーション内クリックアイテム数 (select_promotion)                  |
| itemsPurchased                      | 購入されたアイテム数 (purchaseイベント)                                |
| itemsViewed                         | アイテム閲覧ユニット数 (view_item)                                     |
| itemsViewedInList                   | リスト内閲覧アイテム数 (view_item_list)                                |
| itemsViewedInPromotion              | プロモーション内閲覧アイテム数 (view_promotion)                        |
| keyEvents                           | キーイベント数（マーク済み）                                           |
| newUsers                            | 新規ユーザー数（first_open/first_visit）                               |
| organicGoogleSearchAveragePosition  | Googleオーガニック平均掲載順位（有効リンク必要）                       |
| organicGoogleSearchClickThroughRate | Googleオーガニッククリック率（小数、有効リンク必要）                   |
| organicGoogleSearchClicks           | Googleオーガニッククリック数（有効リンク必要）                         |
| organicGoogleSearchImpressions      | Googleオーガニック表示回数（有効リンク必要）                           |
| promotionClicks                     | プロモーションクリック数 (select_promotion)                            |
| promotionViews                      | プロモーションビュー数 (view_promotion)                                |
| publisherAdClicks                   | パブリッシャー広告クリック数 (ad_click)                                |
| publisherAdImpressions              | パブリッシャー広告表示回数 (ad_impression)                             |
| purchaseRevenue                     | 購入収益（払い戻し差引後、valueパラメータ）                            |
| purchaseToViewRate                  | 表示後購入率（小数）                                                   |
| purchaserRate                       | 購入者率（小数）                                                       |
| refundAmount                        | 払い戻し額（refund/app_store_refundイベント）                          |
| returnOnAdSpend                     | 広告費用対効果（総収益÷広告費用）                                      |
| screenPageViews                     | 画面/ページビュー数（screen_view+page_view）                           |
| screenPageViewsPerSession           | セッションあたりのページビュー数                                       |
| screenPageViewsPerUser              | ユーザーあたりのページビュー数                                         |
| scrolledUsers                       | 90%以上スクロールユーザー数                                            |
| sessionKeyEventRate                 | キーイベント発生セッション率（小数）                                   |
| sessions                            | セッション数（session_startイベント）                                  |
| sessionsPerUser                     | ユーザーあたり平均セッション数                                         |
| shippingAmount                      | 送料（shippingパラメータ）                                             |
| taxAmount                           | 税額（taxパラメータ）                                                  |
| totalAdRevenue                      | 広告収入合計（AdMob＋サードパーティ）                                  |
| totalPurchasers                     | 総購入者数（期間内購入ユーザー数）                                     |
| totalRevenue                        | 総収益（購入+定期+広告収益-払い戻し）                                  |
| totalUsers                          | 合計ユーザー数（1イベント以上記録）                                    |
| transactions                        | トランザクション数（purchase等のイベント）                             |
| transactionsPerPurchaser            | 購入者あたり平均トランザクション数                                     |
| userEngagementDuration              | ユーザーフォアグラウンド動作時間合計（秒）                             |
| userKeyEventRate                    | キーイベントトリガーユーザー率（小数）                                 |
| wauPerMau                           | 30日間中7日間利用率（小数）                                            |
|`;
