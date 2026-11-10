/**
 * Hopwijs affiliate config — PLACEHOLDERS ONLY.
 * Ian vult echte IDs in na goedkeuring bij Bol / Amazon / Awin / TradeTracker.
 * Commit nooit verzonnen tracking-IDs als “live”.
 */
window.HOPWIJS_AFFILIATE = {
  enabled: false,
  bolSiteId: "", // Bol Partner site-id — [IAN_FILLS]
  amazonTag: "", // Amazon Associates tag, bijv. hopwijs-21 — [IAN_FILLS]
  awinPublisherId: "", // Awin publisher id — [IAN_FILLS]
  tradetracker: {
    // campaignId: clickId mapping — [IAN_FILLS]
  },
  // Niet-getrackte fallbacks (veilig tot IDs bestaan)
  fallback: {
    bolSearch: "https://www.bol.com/nl/nl/s/?searchtext=",
    amazonSearch: "https://www.amazon.nl/s?k=",
    zooplusSearch: "https://www.zooplus.nl/search/"
  }
};

window.hopwijsShopSearch = function (query, merchant) {
  var cfg = window.HOPWIJS_AFFILIATE || {};
  var q = encodeURIComponent(query || "");
  var fb = cfg.fallback || {};
  if (merchant === "amazon") {
    var url = (fb.amazonSearch || "https://www.amazon.nl/s?k=") + q;
    if (cfg.enabled && cfg.amazonTag) url += "&tag=" + encodeURIComponent(cfg.amazonTag);
    return url;
  }
  if (merchant === "zooplus") {
    return (fb.zooplusSearch || "https://www.zooplus.nl/search/") + q;
  }
  // default Bol
  return (fb.bolSearch || "https://www.bol.com/nl/nl/s/?searchtext=") + q;
};
