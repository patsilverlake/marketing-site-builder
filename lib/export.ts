import { SectionInstance } from './types'
import { sectionRegistry } from './section-registry'

export interface AnalyticsIntegration {
  provider: string
  trackingId: string
}

export interface ExportOptions {
  title?: string
  description?: string
  includeMeta?: boolean
  includeStyles?: boolean
  analytics?: AnalyticsIntegration[]
}

export function generateHTML(sections: SectionInstance[], options: ExportOptions = {}) {
  const {
    title = 'My Landing Page',
    description = 'Created with Marketing Site Builder',
    includeMeta = true,
    includeStyles = true,
    analytics = []
  } = options

  const sectionsHTML = sections
    .sort((a, b) => a.order - b.order)
    .map(section => generateSectionHTML(section))
    .join('\n')

  const metaTags = includeMeta ? `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
  ` : ''

  const styles = includeStyles ? `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        line-height: 1.5;
        color: #374151;
      }
      
      .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      .text-center { text-align: center; }
      .text-left { text-align: left; }
      .text-right { text-align: right; }
      
      .text-sm { font-size: 0.875rem; }
      .text-base { font-size: 1rem; }
      .text-lg { font-size: 1.125rem; }
      .text-xl { font-size: 1.25rem; }
      .text-2xl { font-size: 1.5rem; }
      .text-3xl { font-size: 1.875rem; }
      .text-4xl { font-size: 2.25rem; }
      .text-5xl { font-size: 3rem; }
      
      .font-bold { font-weight: 700; }
      .font-semibold { font-weight: 600; }
      .font-medium { font-weight: 500; }
      
      .mt-2 { margin-top: 0.5rem; }
      .mt-4 { margin-top: 1rem; }
      .mt-6 { margin-top: 1.5rem; }
      .mt-8 { margin-top: 2rem; }
      .mt-10 { margin-top: 2.5rem; }
      .mb-4 { margin-bottom: 1rem; }
      .mb-6 { margin-bottom: 1.5rem; }
      .mb-8 { margin-bottom: 2rem; }
      .mb-16 { margin-bottom: 4rem; }
      
      .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
      .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .p-6 { padding: 1.5rem; }
      
      .grid { display: grid; }
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .gap-4 { gap: 1rem; }
      .gap-8 { gap: 2rem; }
      .gap-12 { gap: 3rem; }
      
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .justify-between { justify-content: space-between; }
      .space-x-4 > * + * { margin-left: 1rem; }
      .space-x-8 > * + * { margin-left: 2rem; }
      
      .bg-white { background-color: #ffffff; }
      .bg-gray-50 { background-color: #f9fafb; }
      .bg-gray-900 { background-color: #111827; }
      .bg-blue-600 { background-color: #2563eb; }
      
      .text-white { color: #ffffff; }
      .text-gray-600 { color: #4b5563; }
      .text-gray-700 { color: #374151; }
      .text-gray-900 { color: #111827; }
      .text-blue-100 { color: #dbeafe; }
      
      .btn {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s;
      }
      
      .btn-primary {
        background-color: #2563eb;
        color: white;
      }
      
      .btn-primary:hover {
        background-color: #1d4ed8;
      }
      
      .btn-secondary {
        background-color: white;
        color: #374151;
        border: 1px solid #d1d5db;
      }
      
      .btn-secondary:hover {
        background-color: #f9fafb;
      }
      
      .shadow-lg {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      
      .rounded-lg { border-radius: 0.5rem; }
      .border-b { border-bottom: 1px solid #e5e7eb; }
      
      img {
        max-width: 100%;
        height: auto;
      }
      
      @media (min-width: 768px) {
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .md\\:flex { display: flex; }
      }
      
      @media (min-width: 1024px) {
        .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
      }
    </style>
  ` : ''

  const analyticsCode = generateAnalyticsCode(analytics)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${metaTags}
  ${styles}
  ${analyticsCode.head}
</head>
<body>
  ${analyticsCode.bodyStart}
  ${sectionsHTML}
  ${analyticsCode.bodyEnd}
</body>
</html>`
}

function generateAnalyticsCode(analytics: AnalyticsIntegration[]) {
  let head = ''
  let bodyStart = ''
  let bodyEnd = ''

  analytics.forEach(({ provider, trackingId }) => {
    switch (provider) {
      case 'google-analytics':
        head += `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${trackingId}');
</script>`
        break

      case 'google-tag-manager':
        head += `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${trackingId}');</script>
<!-- End Google Tag Manager -->`
        
        bodyStart += `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${trackingId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`
        break

      case 'facebook-pixel':
        head += `
<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${trackingId}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${trackingId}&ev=PageView&noscript=1"
/></noscript>`
        break

      case 'hotjar':
        head += `
<!-- Hotjar Tracking Code -->
<script>
(function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:${trackingId},hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
        break

      case 'mixpanel':
        head += `
<!-- Mixpanel -->
<script type="text/javascript">
(function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(h=0;h<l.length;h++)c(e,l[h]);a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
mixpanel.init("${trackingId}");
</script>`
        break

      case 'plausible':
        head += `
<!-- Plausible Analytics -->
<script defer data-domain="${trackingId}" src="https://plausible.io/js/script.js"></script>`
        break
    }
  })

  return { head, bodyStart, bodyEnd }
}

function generateSectionHTML(section: SectionInstance): string {
  const variation = sectionRegistry.getVariation(section.type, section.variationId)
  if (!variation) return ''

  // This is a simplified HTML generation - in a full implementation,
  // each section component would need a toHTML method
  switch (section.type) {
    case 'header':
      return generateHeaderHTML(section.content)
    case 'hero':
      return generateHeroHTML(section.content)
    case 'features':
      return generateFeaturesHTML(section.content)
    case 'pricing':
      return generatePricingHTML(section.content)
    case 'testimonials':
      return generateTestimonialsHTML(section.content)
    case 'cta':
      return generateCtaHTML(section.content)
    case 'footer':
      return generateFooterHTML(section.content)
    default:
      return ''
  }
}

function generateHeaderHTML(content: any): string {
  const { logo = "🚀", logoText = "Brand", navItems = [], ctaText = "", ctaHref = "" } = content
  
  return `
    <header style="background-color: white; border-bottom: 1px solid #e5e7eb;">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; height: 4rem;">
          <div style="display: flex; align-items: center;">
            <span style="font-size: 1.5rem; margin-right: 0.5rem;">${logo}</span>
            <span style="font-size: 1.25rem; font-weight: 700; color: #111827;">${logoText}</span>
          </div>
          <nav style="display: flex; gap: 2rem;">
            ${navItems.map((item: any) => `<a href="${item.href}" style="color: #374151; text-decoration: none;">${item.label}</a>`).join('')}
            ${ctaText ? `<a href="${ctaHref}" class="btn btn-primary">${ctaText}</a>` : ''}
          </nav>
        </div>
      </div>
    </header>
  `
}

function generateHeroHTML(content: any): string {
  const { title = "", subtitle = "", ctaText = "", ctaHref = "", imageUrl = "" } = content
  
  const hasImage = imageUrl && content.imageUrl !== undefined
  
  if (hasImage) {
    return `
      <section class="bg-white py-20">
        <div class="container">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl font-bold text-gray-900 mb-6">${title}</h1>
              <p class="text-xl text-gray-600 mb-10">${subtitle}</p>
              ${ctaText ? `<a href="${ctaHref}" class="btn btn-primary">${ctaText}</a>` : ''}
            </div>
            <div>
              <img src="${imageUrl}" alt="Hero image" class="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
    `
  }
  
  return `
    <section class="bg-white py-20">
      <div class="container">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">${title}</h1>
          <p class="text-xl text-gray-600 mb-10">${subtitle}</p>
          ${ctaText ? `<a href="${ctaHref}" class="btn btn-primary">${ctaText}</a>` : ''}
        </div>
      </div>
    </section>
  `
}

function generateFeaturesHTML(content: any): string {
  const { title = "", subtitle = "", features = [] } = content
  
  return `
    <section class="bg-gray-50 py-20">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">${title}</h2>
          <p class="text-xl text-gray-600">${subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${features.map((feature: any) => `
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <div style="font-size: 3rem; margin-bottom: 1rem;">${feature.icon}</div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">${feature.title}</h3>
              <p class="text-gray-600">${feature.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function generatePricingHTML(content: any): string {
  const { title = "", subtitle = "", plans = [] } = content
  
  return `
    <section class="bg-gray-50 py-20">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">${title}</h2>
          <p class="text-xl text-gray-600">${subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${plans.map((plan: any) => `
            <div class="bg-white p-6 rounded-lg shadow-lg ${plan.popular ? 'ring-2 ring-blue-500' : ''}">
              ${plan.popular ? '<div style="text-align: center; margin-bottom: 1rem;"><span style="background-color: #2563eb; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem;">Most Popular</span></div>' : ''}
              <div class="text-center">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${plan.name}</h3>
                <div class="mb-4">
                  <span class="text-3xl font-bold text-gray-900">${plan.price}</span>
                  <span class="text-gray-600">${plan.period}</span>
                </div>
                <p class="text-gray-600 mb-6">${plan.description}</p>
              </div>
              <ul style="margin-bottom: 2rem;">
                ${plan.features.map((feature: string) => `
                  <li style="display: flex; align-items: center; margin-bottom: 0.75rem;">
                    <span style="color: #10b981; margin-right: 0.75rem;">✓</span>
                    <span class="text-gray-700">${feature}</span>
                  </li>
                `).join('')}
              </ul>
              <a href="${plan.ctaHref}" class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}" style="width: 100%; text-align: center;">${plan.ctaText}</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function generateTestimonialsHTML(content: any): string {
  const { title = "", subtitle = "", testimonials = [] } = content
  
  return `
    <section class="bg-white py-20">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">${title}</h2>
          <p class="text-xl text-gray-600">${subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${testimonials.map((testimonial: any) => `
            <div class="bg-gray-50 p-6 rounded-lg">
              <div class="mb-4">
                <p class="text-gray-700 text-lg">"${testimonial.content}"</p>
              </div>
              <div class="flex items-center">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" style="width: 3rem; height: 3rem; border-radius: 50%; margin-right: 1rem;" />
                <div>
                  <h4 class="font-semibold text-gray-900">${testimonial.name}</h4>
                  <p class="text-gray-600 text-sm">${testimonial.role} at ${testimonial.company}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function generateCtaHTML(content: any): string {
  const { title = "", subtitle = "", ctaText = "", ctaHref = "" } = content
  
  return `
    <section class="bg-blue-600 py-20">
      <div class="container">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-4">${title}</h2>
          <p class="text-xl text-blue-100 mb-10">${subtitle}</p>
          <a href="${ctaHref}" class="btn btn-secondary">${ctaText}</a>
        </div>
      </div>
    </section>
  `
}

function generateFooterHTML(content: any): string {
  const { logo = "🚀", logoText = "Brand", description = "", sections = [], socialLinks = [], copyright = "" } = content
  
  return `
    <footer class="bg-gray-900 text-white py-16">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <span style="font-size: 1.5rem; margin-right: 0.5rem;">${logo}</span>
              <span class="text-xl font-bold">${logoText}</span>
            </div>
            <p style="color: #9ca3af; margin-bottom: 1.5rem;">${description}</p>
            <div class="flex space-x-4">
              ${socialLinks.map((social: any) => `
                <a href="${social.href}" style="color: #9ca3af; font-size: 1.25rem;">${social.icon}</a>
              `).join('')}
            </div>
          </div>
          ${sections.map((section: any) => `
            <div>
              <h3 style="font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">${section.title}</h3>
              <ul>
                ${section.links.map((link: any) => `
                  <li style="margin-bottom: 0.75rem;">
                    <a href="${link.href}" style="color: #9ca3af; text-decoration: none;">${link.label}</a>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #374151; text-align: center;">
          <p style="color: #9ca3af;">${copyright}</p>
        </div>
      </div>
    </footer>
  `
}

export function downloadHTML(sections: SectionInstance[], options: ExportOptions = {}) {
  const html = generateHTML(sections, options)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `${options.title || 'landing-page'}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}