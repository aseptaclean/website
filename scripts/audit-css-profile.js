/* AC-CP70-91130-1.1. Read-only browser expression; returns measurements, not a score.
   Optional selector overrides: window.AC_CSS_AUDIT_SELECTORS = { hero: '.actual-hero' }.
   Use actual selectors; defaults require data-ac-audit hooks. Does not collect form values.
   Save the returned object through the browser/automation tool. Do not bundle in the site. */
(() => {
  'use strict';
  const roles = ['container','header','utility','hero','heroGrid','heroCopy','heroMedia',
    'heroOverlay','heroForm','formFields','h1','primaryCall','split','splitImage',
    'serviceGrid','serviceCard','cardImage','process','faq','footer','footerGrid','legal'];
  const defaults = Object.fromEntries(roles.map(role => [role, `[data-ac-audit="${role}"]`]));
  const selectors = {...defaults, ...(window.AC_CSS_AUDIT_SELECTORS || {})};
  const properties = ['display','visibility','opacity','position','z-index','box-sizing',
    'width','height','min-width','max-width','min-height','max-height','padding-top','padding-right',
    'padding-bottom','padding-left','margin-top','margin-right','margin-bottom','margin-left',
    'gap','row-gap','column-gap','grid-template-columns','grid-template-rows','grid-column-start',
    'grid-column-end','align-items','justify-content','flex-direction','order','font-family',
    'font-size','font-weight','line-height','letter-spacing','color','background-color',
    'border-top-width','border-top-color','border-radius','box-shadow','object-fit','object-position',
    'aspect-ratio','overflow-x','overflow-y','clip-path','transform'];
  const round = n => Math.round(n * 100) / 100;
  const rectData = rect => Object.fromEntries(['x','y','width','height','top','right','bottom','left']
    .map(key => [key, round(rect[key])]));
  const measure = element => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const clippingAncestors = [];
    for (let node = element.parentElement; node; node = node.parentElement) {
      const parentStyle = getComputedStyle(node);
      if ([parentStyle.overflowX, parentStyle.overflowY].some(v => /^(hidden|clip|auto|scroll)$/.test(v)) ||
          (parentStyle.clipPath && parentStyle.clipPath !== 'none')) {
        clippingAncestors.push({tag:node.tagName.toLowerCase(),
          overflowX:parentStyle.overflowX, overflowY:parentStyle.overflowY,
          clipPath:parentStyle.clipPath, rect:rectData(node.getBoundingClientRect())});
      }
    }
    const result = {
      tag:element.tagName.toLowerCase(), rectViewport:rectData(rect),
      documentTop:round(rect.top + window.scrollY), documentLeft:round(rect.left + window.scrollX),
      computed:Object.fromEntries(properties.map(p => [p,style.getPropertyValue(p)])),
      hasBox:element.getClientRects().length > 0 && rect.width > 0 && rect.height > 0,
      withinViewportBounds:rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth,
      extendsBelowViewport:rect.bottom > window.innerHeight,
      clearanceToViewportBottom:round(window.innerHeight - rect.bottom),
      overflowPast16pxClearanceIgnoringObstructions:round(Math.max(0, rect.bottom - (window.innerHeight - 16))),
      clippingAncestors,
      interpretation:'Bounds and overflow are evidence only; inspect actual clipping, scrolling, visibility and occlusion.'
    };
    if (element.tagName === 'IMG') result.image = {
      complete:element.complete, naturalWidth:element.naturalWidth, naturalHeight:element.naturalHeight,
      ready:element.complete && element.naturalWidth > 0
    };
    const href = element.getAttribute('href');
    if (href && /^tel:/i.test(href)) result.telephoneHref = href;
    return result;
  };
  const results = {};
  for (const [role,selector] of Object.entries(selectors)) {
    if (typeof selector !== 'string' || !selector.trim()) {
      results[role] = {status:'UNVERIFIED', reason:'Selector not configured'};
      continue;
    }
    try {
      const nodes = [...document.querySelectorAll(selector)];
      results[role] = {selector, status:nodes.length ? 'MEASURED_NOT_GRADED' : 'UNVERIFIED',
        reason:nodes.length ? 'Requires profile comparison and visual confirmation' : 'Selector unmapped or element absent; establish applicability manually',
        totalMatches:nodes.length, recordedMatches:Math.min(nodes.length,100), truncated:nodes.length > 100,
        elements:nodes.slice(0,100).map(measure)};
    } catch (error) {
      results[role] = {selector,status:'UNVERIFIED',reason:'Selector or measurement failed',errorName:error.name};
    }
  }
  return {
    profileId:'AC-CP70-91130-1.1', capturedAt:new Date().toISOString(),
    foldRequirement:{desktopBottomClearance:16,requiredScrollY:0,
      atRequiredScroll:window.scrollY === 0,
      obstructionStatus:'UNVERIFIED: measure actual persistent top/bottom UI and modal state manually',
      note:'Raw viewport clearance ignores obstructions. No pass follows from positive clearance alone; inspect full hero/form and profile section 7.'},
    page:window.location.origin + window.location.pathname,
    viewport:{width:window.innerWidth,height:window.innerHeight,clientWidth:document.documentElement.clientWidth,
      devicePixelRatio:window.devicePixelRatio,scrollX:window.scrollX,scrollY:window.scrollY,
      visualViewport:window.visualViewport ? {width:window.visualViewport.width,height:window.visualViewport.height,scale:window.visualViewport.scale} : null},
    document:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight},
    fonts:{status:document.fonts ? document.fonts.status : 'unavailable',
      note:'Loaded font identity still requires verification; computed family names do not prove font download.'},
    limitations:['No automatic pass/fail or similarity score','No winning-rule trace','No form delivery or policy validation','No occlusion test','Measurements reflect current scroll/state only'],
    roles:results
  };
})()
