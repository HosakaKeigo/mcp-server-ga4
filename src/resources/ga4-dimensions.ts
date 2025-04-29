export const GA4_DIMENSIONS = `| API Name                        | Description |
| -------------------------------- | ------------------------------------------------------------ |
| achievementId                    | In-game achievement ID (from achievement_id parameter) |
| adFormat                         | Ad display format (e.g., Interstitial, Banner, Rewarded, Native advanced) |
| adSourceName                     | Ad network name (e.g., AdMob Network, Facebook Audience) |
| adUnitName                       | Ad unit name (name of the ad slot in the app) |
| appVersion                       | App version (Android: versionName, iOS: short bundle version) |
| audienceId                       | Audience numeric ID (group affiliation during event period) |
| audienceName                     | Audience name (name of the group) |
| audienceResourceName             | Audience resource name (for unique identification) |
| brandingInterest                 | User's interests |
| browser                          | Browser name used |
| campaignId                       | Campaign ID (marketing campaign identifier) |
| campaignName                     | Campaign name (marketing campaign name) |
| character                        | In-game character name (character during the event) |
| city                             | City where user action occurred |
| cityId                           | City region ID (obtained from IP) |
| cm360AccountId                   | CM360 account ID (campaign manager identifier) |
| cm360AccountName                 | CM360 account name |
| cm360AdvertiserId                | CM360 advertiser ID |
| cm360AdvertiserName              | CM360 advertiser name |
| cm360CampaignId                  | CM360 campaign ID |
| cm360CampaignName                | CM360 campaign name |
| cm360CreativeFormat              | CM360 creative format (type) |
| cm360CreativeId                  | CM360 creative ID |
| cm360CreativeName                | CM360 creative name |
| cm360CreativeType                | CM360 creative type (category) |
| cm360CreativeTypeId              | CM360 creative type ID |
| cm360CreativeVersion             | CM360 creative version |
| cm360Medium                      | CM360 medium (placement billing type) |
| cm360PlacementCostStructure      | CM360 placement cost structure (e.g., CPM) |
| cm360PlacementId                 | CM360 placement ID (ad display location) |
| cm360PlacementName               | CM360 placement name |
| cm360RenderingId                 | CM360 rendering ID |
| cm360SiteId                      | CM360 site ID |
| cm360SiteName                    | CM360 site name |
| cm360Source                      | CM360 source (site name) |
| cm360SourceMedium                | CM360 source/medium |
| cohort                           | Cohort name (user group) |
| cohortNthDay                     | Daily cohort (number of days since first session) |
| cohortNthMonth                   | Monthly cohort (number of months since first session) |
| cohortNthWeek                    | Weekly cohort (number of weeks since first session) |
| contentGroup                     | Content group (category of published content) |
| contentId                        | Content ID (from content_id parameter) |
| contentType                      | Content type (from content_type parameter) |
| continent                        | Continent where user action occurred |
| continentId                      | Continent ID (obtained from IP) |
| country                          | Country where user action occurred |
| countryId                        | Country ID (ISO code, obtained from IP) |
| currencyCode                     | Currency code (for e-commerce, ISO4217) |
| date                             | Event date (YYYYMMDD) |
| dateHour                         | Date and hour (YYYYMMDDHH) |
| dateHourMinute                   | Date and hour and minute (YYYYMMDDHHMM) |
| day                              | Day of the month (01-31) |
| dayOfWeek                        | Day of the week (numeric, 0=Sunday) |
| dayOfWeekName                    | Day of the week name (in English) |
| defaultChannelGroup              | Default channel group (based on source/medium) |
| deviceCategory                   | Device category (PC/Tablet/Mobile) |
| deviceModel                      | Mobile device model |
| dv360AdvertiserId                | DV360 advertiser ID |
| dv360AdvertiserName              | DV360 advertiser name |
| dv360CampaignId                  | DV360 campaign ID |
| dv360CampaignName                | DV360 campaign name |
| dv360CreativeFormat              | DV360 creative format |
| dv360CreativeId                  | DV360 creative ID |
| dv360CreativeName                | DV360 creative name |
| dv360ExchangeId                  | DV360 exchange ID |
| dv360ExchangeName                | DV360 exchange name |
| dv360InsertionOrderId            | DV360 insertion order ID |
| dv360InsertionOrderName          | DV360 insertion order name |
| dv360LineItemId                  | DV360 line item ID |
| dv360LineItemName                | DV360 line item name |
| dv360Medium                      | DV360 medium (e.g., cpm) |
| dv360PartnerId                   | DV360 partner ID |
| dv360PartnerName                 | DV360 partner name |
| dv360Source                      | DV360 source (site name) |
| dv360SourceMedium                | DV360 source/medium |
| eventName                        | Event name |
| fileExtension                    | Download file extension (e.g., pdf, txt) |
| fileName                         | Download file path |
| firstSessionDate                 | First session date (YYYYMMDD) |
| firstUserCampaignId              | First user acquisition campaign ID |
| firstUserCampaignName            | First user acquisition campaign name |
| firstUserCm360AccountId          | First user acquisition CM360 account ID |
| firstUserCm360AccountName        | First user acquisition CM360 account name |
| firstUserCm360AdvertiserId       | First user acquisition CM360 advertiser ID |
| firstUserCm360AdvertiserName     | First user acquisition CM360 advertiser name |
| firstUserCm360CampaignId         | First user acquisition CM360 campaign ID |
| firstUserCm360CampaignName       | First user acquisition CM360 campaign name |
| firstUserCm360CreativeFormat     | First user acquisition CM360 creative format |
| firstUserCm360CreativeId         | First user acquisition CM360 creative ID |
| firstUserCm360CreativeName       | First user acquisition CM360 creative name |
| firstUserCm360CreativeType       | First user acquisition CM360 creative type |
| firstUserCm360CreativeTypeId     | First user acquisition CM360 creative type ID |
| firstUserCm360CreativeVersion    | First user acquisition CM360 creative version |
| firstUserCm360Medium             | First user acquisition CM360 medium |
| firstUserCm360PlacementCostStructure | First user acquisition CM360 placement cost structure |
| firstUserCm360PlacementId        | First user acquisition CM360 placement ID |
| firstUserCm360PlacementName      | First user acquisition CM360 placement name |
| firstUserCm360RenderingId        | First user acquisition CM360 rendering ID |
| firstUserCm360SiteId             | First user acquisition CM360 site ID |
| firstUserCm360SiteName           | First user acquisition CM360 site name |
| firstUserCm360Source             | First user acquisition CM360 source |
| firstUserCm360SourceMedium       | First user acquisition CM360 source/medium |
| firstUserDefaultChannelGroup     | First user acquisition default channel group |
| firstUserDv360AdvertiserId       | First user acquisition DV360 advertiser ID |
| firstUserDv360AdvertiserName     | First user acquisition DV360 advertiser name |
| firstUserDv360CampaignId         | First user acquisition DV360 campaign ID |
| firstUserDv360CampaignName       | First user acquisition DV360 campaign name |
| firstUserDv360CreativeFormat     | First user acquisition DV360 creative format |
| firstUserDv360CreativeId         | First user acquisition DV360 creative ID |
| firstUserDv360CreativeName       | First user acquisition DV360 creative name |
| firstUserDv360ExchangeId         | First user acquisition DV360 exchange ID |
| firstUserDv360ExchangeName       | First user acquisition DV360 exchange name |
| firstUserDv360InsertionOrderId   | First user acquisition DV360 insertion order ID |
| firstUserDv360InsertionOrderName | First user acquisition DV360 insertion order name |
| firstUserDv360LineItemId         | First user acquisition DV360 line item ID |
| firstUserDv360LineItemName       | First user acquisition DV360 line item name |
| firstUserDv360Medium             | First user acquisition DV360 medium |
| firstUserDv360PartnerId          | First user acquisition DV360 partner ID |
| firstUserDv360PartnerName        | First user acquisition DV360 partner name |
| firstUserDv360Source             | First user acquisition DV360 source |
| firstUserDv360SourceMedium       | First user acquisition DV360 source/medium |
| firstUserGoogleAdsAccountName    | First user acquisition Google Ads account name |
| firstUserGoogleAdsAdGroupId      | First user acquisition Google Ads ad group ID |
| firstUserGoogleAdsAdGroupName    | First user acquisition Google Ads ad group name |
| firstUserGoogleAdsAdNetworkType  | First user acquisition Google Ads network type |
| firstUserGoogleAdsCampaignId     | First user acquisition Google Ads campaign ID |
| firstUserGoogleAdsCampaignName   | First user acquisition Google Ads campaign name |
| firstUserGoogleAdsCampaignType   | First user acquisition Google Ads campaign type |
| firstUserGoogleAdsCreativeId     | First user acquisition Google Ads creative ID |
| firstUserGoogleAdsCustomerId     | First user acquisition Google Ads customer ID |
| firstUserGoogleAdsKeyword        | First user acquisition Google Ads keyword |
| firstUserGoogleAdsQuery          | First user acquisition Google Ads search query |
| firstUserManualAdContent         | First user acquisition manual ad content (utm_content) |
| firstUserManualCampaignId        | First user acquisition manual campaign ID (utm_id) |
| firstUserManualCampaignName      | First user acquisition manual campaign name (utm_campaign) |
| firstUserManualCreativeFormat    | First user acquisition manual creative format |
| firstUserManualMarketingTactic   | First user acquisition manual marketing tactic |
| firstUserManualMedium            | First user acquisition manual medium (utm_medium) |
| firstUserManualSource            | First user acquisition manual source (utm_source) |
| firstUserManualSourceMedium      | First user acquisition manual source/medium |
| firstUserManualSourcePlatform    | First user acquisition manual source platform (utm_source_platform) |
| firstUserManualTerm              | First user acquisition manual term (utm_term) |
| firstUserMedium                  | First user acquisition medium |
| firstUserPrimaryChannelGroup     | First user acquisition primary channel group |
| firstUserSa360AdGroupId          | First user acquisition SA360 ad group ID |
| firstUserSa360AdGroupName        | First user acquisition SA360 ad group name |
| firstUserSa360CampaignId         | First user acquisition SA360 campaign ID |
| firstUserSa360CampaignName       | First user acquisition SA360 campaign name |
| firstUserSa360CreativeFormat     | First user acquisition SA360 creative format |
| firstUserSa360EngineAccountId    | First user acquisition SA360 engine account ID |
| firstUserSa360EngineAccountName  | First user acquisition SA360 engine account name |
| firstUserSa360EngineAccountType    | First user acquisition SA360 engine account type |
| firstUserSa360KeywordText        | First user acquisition SA360 keyword text |
| firstUserSa360ManagerAccountId   | First user acquisition SA360 manager account ID |
| firstUserSa360ManagerAccountName | First user acquisition SA360 manager account name |
| firstUserSa360Medium             | First user acquisition SA360 medium |
| firstUserSa360Query              | First user acquisition SA360 search query |
| firstUserSa360Source             | First user acquisition SA360 source |
| firstUserSa360SourceMedium       | First user acquisition SA360 source/medium |
| firstUserSource                  | First user acquisition source |
| firstUserSourceMedium            | First user acquisition source/medium |
| firstUserSourcePlatform          | First user acquisition source platform |
| fullPageUrl                      | Full page URL (hostname + path + query) |
| googleAdsAccountName             | Google Ads account name |
| googleAdsAdGroupId               | Google Ads ad group ID |
| googleAdsAdGroupName             | Google Ads ad group name |
| googleAdsAdNetworkType           | Google Ads network type |
| googleAdsCampaignId              | Google Ads campaign ID |
| googleAdsCampaignName            | Google Ads campaign name |
| googleAdsCampaignType            | Google Ads campaign type |
| googleAdsCreativeId              | Google Ads creative ID |
| googleAdsCustomerId              | Google Ads customer ID |
| googleAdsKeyword                 | Google Ads keyword |
| googleAdsQuery                   | Google Ads search query |
| groupId                          | In-game player group ID (from group_id parameter) |
| hostName                         | Hostname (subdomain + domain name) |
| hour                             | Hour of the record (0-23) |
| isKeyEvent                       | "true" if it is a key event |
| isoWeek                          | ISO week number (e.g., 01-53) |
| isoYear                          | ISO year (e.g., 2022) |
| isoYearIsoWeek                   | Combination of ISO year and week number |
| itemAffiliation                  | Item affiliation |
| itemBrand                        | Item brand name |
| itemCategory                     | Item category (1st level) |
| itemCategory2                    | Item category 2 |
| itemCategory3                    | Item category 3 |
| itemCategory4                    | Item category 4 |
| itemCategory5                    | Item category 5 |
| itemId                           | Item ID |
| itemListId                       | Item list ID |
| itemListName                     | Item list name |
| itemListPosition                 | Item position in the list |
| itemLocationID                   | Item location ID (e.g., physical store) |
| itemName                         | Item name |
| itemPromotionCreativeName        | Promotion creative name |
| itemPromotionCreativeSlot        | Promotion creative slot name |
| itemPromotionId                  | Item promotion ID |
| itemPromotionName                | Item promotion name |
| itemVariant                      | Item variant (e.g., size, color) |
| landingPage                      | Landing page path |
| landingPagePlusQueryString       | Landing page + query string |
| language                         | Browser/device language |
| languageCode                     | Language code (e.g., en-us) |
| level                            | In-game level |
| linkClasses                      | HTML classes of outbound link |
| linkDomain                       | Link destination domain |
| linkId                           | HTML ID of the link |
| linkText                         | Link text for download |
| linkUrl                          | Link destination URL (external link, download) |
| manualAdContent                  | Manual ad content (utm_content) |
| manualCampaignId                 | Manual campaign ID (utm_id) |
| manualCampaignName               | Manual campaign name (utm_campaign) |
| manualCreativeFormat             | Manual creative format |
| manualMarketingTactic            | Manual marketing tactic |
| manualMedium                     | Manual medium (utm_medium) |
| manualSource                     | Manual source (utm_source) |
| manualSourceMedium               | Manual source/medium |
| manualSourcePlatform             | Manual source platform (utm_source_platform) |
| manualTerm                       | Manual term (utm_term) |
| medium                           | Medium contributing to the event |
| method                           | Method triggering the event |
| minute                           | Minute of the record (00-59) |
| mobileDeviceBranding             | Device brand name |
| mobileDeviceMarketingName        | Branded device name |
| mobileDeviceModel                | Mobile device model name |
| month                            | Month of the record (01-12) |
| newVsReturning                   | New or returning (new/returning) |
| nthDay                           | Number of days elapsed (since the start of the period) |
| nthHour                          | Number of hours elapsed (since the start of the period) |
| nthMinute                        | Number of minutes elapsed (since the start of the period) |
| nthMonth                         | Number of months elapsed (since the start of the period) |
| nthWeek                          | Number of weeks elapsed (since the start of the period) |
| nthYear                          | Number of years elapsed (since the start of the period) |
| operatingSystem                  | Operating system (e.g., Windows, Android) |
| operatingSystemVersion           | OS version |
| operatingSystemWithVersion       | Combination of OS and version |
| orderCoupon                      | Order coupon code |
| outbound                         | "true" if it is an outbound link |
| pageLocation                     | Full page URL (including protocol) |
| pagePath                         | Page path (between hostname and query) |
| pagePathPlusQueryString          | Page path + query string |
| pageReferrer                     | Referrer URL (previous page) |
| pageTitle                        | Page title |
| percentScrolled                  | Scroll percentage (e.g., 90) |
| platform                         | Execution platform (web/iOS/Android) |
| platformDeviceCategory           | Platform/device category |
| primaryChannelGroup              | Primary channel group |
| region                           | Region where user action occurred (obtained from IP) |
| sa360AdGroupId                   | SA360 ad group ID |
| sa360AdGroupName                 | SA360 ad group name |
| sa360CampaignId                  | SA360 campaign ID |
| sa360CampaignName                | SA360 campaign name |
| sa360CreativeFormat              | SA360 creative format |
| sa360EngineAccountId             | SA360 engine account ID |
| sa360EngineAccountName           | SA360 engine account name |
| sa360EngineAccountType           | SA360 engine account type |
| sa360KeywordText                 | SA360 keyword text |
| sa360ManagerAccountId            | SA360 manager account ID |
| sa360ManagerAccountName          | SA360 manager account name |
| sa360Medium                      | SA360 medium |
| sa360Query                       | SA360 search query |
| sa360Source                      | SA360 source |
| sa360SourceMedium                | SA360 source/medium |
| screenResolution                 | Screen resolution |
| searchTerm                       | Search term |
| sessionCampaignId                | Session campaign ID |
| sessionCampaignName              | Session campaign name |
| sessionCm360AccountId            | Session CM360 account ID |
| sessionCm360AccountName          | Session CM360 account name |
| sessionCm360AdvertiserId         | Session CM360 advertiser ID |
| sessionCm360AdvertiserName       | Session CM360 advertiser name |
| sessionCm360CampaignId           | Session CM360 campaign ID |
| sessionCm360CampaignName         | Session CM360 campaign name |
| sessionCm360CreativeFormat       | Session CM360 creative format |
| sessionCm360CreativeId           | Session CM360 creative ID |
| sessionCm360CreativeName         | Session CM360 creative name |
| sessionCm360CreativeType         | Session CM360 creative type |
| sessionCm360CreativeTypeId       | Session CM360 creative type ID |
| sessionCm360CreativeVersion      | Session CM360 creative version |
| sessionCm360Medium               | Session CM360 medium |
| sessionCm360PlacementCostStructure | Session CM360 placement cost structure |
| sessionCm360PlacementId          | Session CM360 placement ID |
| sessionCm360PlacementName        | Session CM360 placement name |
| sessionCm360RenderingId          | Session CM360 rendering ID |
| sessionCm360SiteId               | Session CM360 site ID |
| sessionCm360SiteName             | Session CM360 site name |
| sessionCm360Source               | Session CM360 source |
| sessionCm360SourceMedium         | Session CM360 source/medium |
| sessionDefaultChannelGroup       | Session default channel group |
| sessionDv360AdvertiserId         | Session DV360 advertiser ID |
| sessionDv360AdvertiserName       | Session DV360 advertiser name |
| sessionDv360CampaignId           | Session DV360 campaign ID |
| sessionDv360CampaignName         | Session DV360 campaign name |
| sessionDv360CreativeFormat       | Session DV360 creative format |
| sessionDv360CreativeId           | Session DV360 creative ID |
| sessionDv360CreativeName         | Session DV360 creative name |
| sessionDv360ExchangeId           | Session DV360 exchange ID |
| sessionDv360ExchangeName         | Session DV360 exchange name |
| sessionDv360InsertionOrderId     | Session DV360 insertion order ID |
| sessionDv360InsertionOrderName   | Session DV360 insertion order name |
| sessionDv360LineItemId           | Session DV360 line item ID |
| sessionDv360LineItemName         | Session DV360 line item name |
| sessionDv360Medium               | Session DV360 medium |
| sessionDv360PartnerId            | Session DV360 partner ID |
| sessionDv360PartnerName          | Session DV360 partner name |
| sessionDv360Source               | Session DV360 source |
| sessionDv360SourceMedium         | Session DV360 source/medium |
| sessionGoogleAdsAccountName      | Session Google Ads account name |
| sessionGoogleAdsAdGroupId        | Session Google Ads ad group ID |
| sessionGoogleAdsAdGroupName      | Session Google Ads ad group name |
| sessionGoogleAdsAdNetworkType    | Session Google Ads network type |
| sessionGoogleAdsCampaignId       | Session Google Ads campaign ID |
| sessionGoogleAdsCampaignName     | Session Google Ads campaign name |
| sessionGoogleAdsCampaignType     | Session Google Ads campaign type |
| sessionGoogleAdsCreativeId       | Session Google Ads creative ID |
| sessionGoogleAdsCustomerId       | Session Google Ads customer ID |
| sessionGoogleAdsKeyword          | Session Google Ads keyword |
| sessionGoogleAdsQuery            | Session Google Ads search query |
| sessionManualAdContent           | Session manual ad content (utm_content) |
| sessionManualCampaignId          | Session manual campaign ID (utm_id) |
| sessionManualCampaignName        | Session manual campaign name (utm_campaign) |
| sessionManualCreativeFormat      | Session manual creative format |
| sessionManualMarketingTactic     | Session manual marketing tactic |
| sessionManualMedium              | Session manual medium (utm_medium) |
| sessionManualSource              | Session manual source (utm_source) |
| sessionManualSourceMedium        | Session manual source/medium |
| sessionManualSourcePlatform      | Session manual source platform (utm_source_platform) |
| sessionManualTerm                | Session manual term (utm_term) |
| sessionMedium                    | Medium at the start of the session |
| sessionPrimaryChannelGroup       | Session primary channel group |
| sessionSa360AdGroupId            | Session SA360 ad group ID |
| sessionSa360AdGroupName          | Session SA360 ad group name |
| sessionSa360CampaignId           | Session SA360 campaign ID |
| sessionSa360CampaignName         | Session SA360 campaign name |
| sessionSa360CreativeFormat       | Session SA360 creative format |
| sessionSa360EngineAccountId      | Session SA360 engine account ID |
| sessionSa360EngineAccountName    | Session SA360 engine account name |
| sessionSa360EngineAccountType    | Session SA360 engine account type |
| sessionSa360Keyword              | Session SA360 keyword |
| sessionSa360ManagerAccountId     | Session SA360 manager account ID |
| sessionSa360ManagerAccountName   | Session SA360 manager account name |
| sessionSa360Medium               | Session SA360 medium |
| sessionSa360Query                | Session SA360 search query |
| sessionSa360Source               | Session SA360 source |
| sessionSa360SourceMedium         | Session SA360 source/medium |
| sessionSource                    | Session source |
| sessionSourceMedium              | Session source/medium |
| sessionSourcePlatform            | Session source platform |
| shippingTier                     | Shipping tier (shipping method) |
| signedInWithUserId               | "yes" if signed in with User-ID |
| source                           | Source contributing to the event |
| sourceMedium                     | Source/medium (combination of source and medium) |
| sourcePlatform                   | Source platform |
| streamId                         | Data stream ID |
| streamName                       | Data stream name |
| testDataFilterId                 | Test data filter ID |
| testDataFilterName               | Test data filter name |
| transactionId                    | E-commerce transaction ID |
| unifiedPagePathScreen            | Page path/screen class (at the time of the event) |
| unifiedPageScreen                | Page path + query/screen class |
| unifiedScreenClass               | Page title + screen class |
| unifiedScreenName                | Page title + screen name |
| userAgeBracket                   | User age bracket |
| userGender                       | User gender |
| videoProvider                    | Video provider (e.g., youtube) |
| videoTitle                       | Video title |
| videoUrl                         | Video URL |
| virtualCurrencyName              | Virtual currency name (in-game currency) |
| visible                          | "true" if visible |
| week                             | Week of the event record (01-53) |
| year                             | Year of the event record (4 digits) |
| yearMonth                        | Combination of year and month (e.g., 202212) |
| yearWeek                         | Combination of year and week (e.g., 202253) |`;
