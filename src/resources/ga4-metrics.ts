export const GA4_METRICS = `| API Name                              | Description                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------- |
| active1DayUsers                     | Number of unique active users within 1 day (including the last day)                    |
| active28DayUsers                    | Number of unique active users within 28 days (including the last day)                   |
| active7DayUsers                     | Number of unique active users within 7 days (including the last day)                    |
| activeUsers                         | Number of unique users accessing the site/app                                  |
| adUnitExposure                      | Ad unit display time (milliseconds)                                         |
| addToCarts                          | Number of times items were added to the cart                                             |
| advertiserAdClicks                  | Number of ad clicks (including integrated clicks)                                     |
| advertiserAdCost                    | Total ad cost (including integrated cost)                                           |
| advertiserAdCostPerClick            | Cost per click (CPC)                                                |
| advertiserAdCostPerKeyEvent         | Ad cost per key event                                          |
| advertiserAdImpressions             | Number of ad impressions (including integrated impressions)                                           |
| averagePurchaseRevenue              | Average purchase revenue (transaction group)                               |
| averagePurchaseRevenuePerPayingUser | Average purchase revenue per paying user (ARPPU)                                       |
| averagePurchaseRevenuePerUser       | Average purchase revenue per user                                             |
| averageRevenuePerUser               | Average revenue per active user (ARPU)                                      |
| averageSessionDuration              | Average session duration (seconds)                                           |
| bounceRate                          | Bounce rate (decimal)                                                         |
| cartToViewRate                      | Cart addition rate after viewing (decimal)                                             |
| checkouts                           | Number of times checkout was started (begin_checkout event)                                 |
| cohortActiveUsers                   | Number of active users within the cohort period                                   |
| cohortTotalUsers                    | Total number of users within the cohort (decreases after period selection)                               |
| crashAffectedUsers                  | Number of users reporting crashes                                               |
| crashFreeUsersRate                  | Percentage of users without crashes (decimal)                                     |
| dauPerMau                           | 1-day usage rate within 30 days (decimal)                                              |
| dauPerWau                           | 1-day usage rate within 7 days (decimal)                                               |
| ecommercePurchases                  | Number of completed purchases (purchase event)                                     |
| engagedSessions                     | Number of engagement sessions (over 10 seconds/key event/≥2 screen views) |
| engagementRate                      | Engagement rate (decimal)                                             |
| eventCount                          | Total number of events                                                           |
| eventCountPerUser                   | Average number of events per user                                           |
| eventValue                          | Total value of event value parameter                                            |
| eventsPerSession                    | Average number of events per session                                         |
| firstTimePurchaserRate              | First-time purchaser rate (decimal)                                                   |
| firstTimePurchasers                 | Number of first-time purchasers                                                           |
| firstTimePurchasersPerNewUser       | Average number of first-time purchasers per new user                                     |
| grossItemRevenue                    | Total item revenue (excluding tax, shipping, and refunds)                               |
| grossPurchaseRevenue                | Total revenue from purchases (including purchase events)                                         |
| itemDiscountAmount                  | Item discount amount (discount parameter)                                   |
| itemListClickEvents                 | Number of item list click events (select_item)                         |
| itemListClickThroughRate            | Item list click-through rate (decimal)                                       |
| itemListViewEvents                  | Number of item list view events (view_item_list)                        |
| itemPromotionClickThroughRate       | Promotion click-through rate (decimal)                                       |
| itemRefundAmount                    | Item refund amount (refund event)                                   |
| itemRevenue                         | Item revenue (purchase revenue - refunds)                                      |
| itemViewEvents                      | Number of item view events (view_item)                                   |
| itemsAddedToCart                    | Number of items added to the cart (within add_to_cart)                          |
| itemsCheckedOut                     | Number of items checked out (within begin_checkout)                               |
| itemsClickedInList                  | Number of items clicked in the list (select_item)                               |
| itemsClickedInPromotion             | Number of items clicked in the promotion (select_promotion)                  |
| itemsPurchased                      | Number of items purchased (purchase event)                                |
| itemsViewed                         | Number of item view units (view_item)                                     |
| itemsViewedInList                   | Number of items viewed in the list (view_item_list)                                |
| itemsViewedInPromotion              | Number of items viewed in the promotion (view_promotion)                        |
| keyEvents                           | Number of key events (marked)                                           |
| newUsers                            | Number of new users (first_open/first_visit)                               |
| organicGoogleSearchAveragePosition  | Average position in Google organic search (requires valid link)                       |
| organicGoogleSearchClickThroughRate | Google organic click-through rate (decimal, requires valid link)                   |
| organicGoogleSearchClicks           | Number of Google organic clicks (requires valid link)                         |
| organicGoogleSearchImpressions      | Number of Google organic impressions (requires valid link)                           |
| promotionClicks                     | Number of promotion clicks (select_promotion)                            |
| promotionViews                      | Number of promotion views (view_promotion)                                |
| publisherAdClicks                   | Number of publisher ad clicks (ad_click)                                |
| publisherAdImpressions              | Number of publisher ad impressions (ad_impression)                             |
| purchaseRevenue                     | Purchase revenue (after deducting refunds, value parameter)                            |
| purchaseToViewRate                  | Purchase rate after viewing (decimal)                                                   |
| purchaserRate                       | Purchaser rate (decimal)                                                       |
| refundAmount                        | Refund amount (refund/app_store_refund event)                          |
| returnOnAdSpend                     | Return on ad spend (total revenue ÷ ad cost)                                      |
| screenPageViews                     | Number of screen/page views (screen_view + page_view)                           |
| screenPageViewsPerSession           | Number of page views per session                                       |
| screenPageViewsPerUser              | Number of page views per user                                         |
| scrolledUsers                       | Number of users who scrolled more than 90%                                            |
| sessionKeyEventRate                 | Session rate with key events (decimal)                                   |
| sessions                            | Number of sessions (session_start event)                                  |
| sessionsPerUser                     | Average number of sessions per user                                         |
| shippingAmount                      | Shipping amount (shipping parameter)                                             |
| taxAmount                           | Tax amount (tax parameter)                                                  |
| totalAdRevenue                      | Total ad revenue (AdMob + third-party)                                  |
| totalPurchasers                     | Total number of purchasers (number of users who made purchases within the period)                                     |
| totalRevenue                        | Total revenue (purchases + subscriptions + ad revenue - refunds)                                  |
| totalUsers                          | Total number of users (recorded at least one event)                                    |
| transactions                        | Number of transactions (purchase events, etc.)                             |
| transactionsPerPurchaser            | Average number of transactions per purchaser                                     |
| userEngagementDuration              | Total user foreground operation time (seconds)                             |
| userKeyEventRate                    | User rate triggering key events (decimal)                                 |
| wauPerMau                           | 7-day usage rate within 30 days (decimal)                                            |
|`;
