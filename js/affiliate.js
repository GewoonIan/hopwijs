/**
 * Hopwijs affiliate.js — thin compatibility shim.
 * Prefer js/site-config.js + js/site-bootstrap.js (één paste-plek).
 * Kept so older references still resolve without inventing IDs.
 */
(function () {
  var cfg = window.HOPWIJS_CONFIG || {};
  var aff = cfg.AFFILIATE || {};
  function pending(v) {
    return !v || /_PENDING$/i.test(String(v).trim());
  }
  window.HOPWIJS_AFFILIATE = {
    enabled: false,
    bolSiteId: pending(aff.BOL_SITE_ID) ? "" : aff.BOL_SITE_ID,
    amazonTag: pending(aff.AMAZON_NL_TRACKING_ID) ? "" : aff.AMAZON_NL_TRACKING_ID,
    awinPublisherId: pending(aff.AWIN_PUBLISHER_ID) ? "" : aff.AWIN_PUBLISHER_ID,
    tradetracker: {},
    fallback: cfg.FALLBACK || {
      bolSearch: "https://www.bol.com/nl/nl/s/?searchtext=",
      amazonSearch: "https://www.amazon.nl/s?k=",
      zooplusSearch: "https://www.zooplus.nl/search/"
    }
  };
  if (typeof window.hopwijsShopSearch !== "function") {
    window.hopwijsShopSearch = function (query, merchant) {
      var fb = window.HOPWIJS_AFFILIATE.fallback || {};
      var q = encodeURIComponent(query || "");
      if (merchant === "amazon") return (fb.amazonSearch || "https://www.amazon.nl/s?k=") + q;
      if (merchant === "zooplus") return (fb.zooplusSearch || "https://www.zooplus.nl/search/") + q;
      return (fb.bolSearch || "https://www.bol.com/nl/nl/s/?searchtext=") + q;
    };
  }
})();
