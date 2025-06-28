'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BarChart3, Eye, MousePointer, TrendingUp, Settings, Copy, Check } from 'lucide-react'

interface AnalyticsProvider {
  id: string
  name: string
  description: string
  icon: string
  setupInstructions: string
  trackingCodeTemplate: string
  features: string[]
}

const analyticsProviders: AnalyticsProvider[] = [
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    description: 'Comprehensive web analytics with advanced insights and reporting',
    icon: '📊',
    setupInstructions: 'Create a GA4 property in Google Analytics and copy your Measurement ID (starts with G-)',
    trackingCodeTemplate: 'G-XXXXXXXXXX',
    features: ['Page views', 'User behavior', 'Conversion tracking', 'Real-time data', 'Custom events']
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    description: 'Manage multiple tracking codes and marketing tags in one place',
    icon: '🏷️',
    setupInstructions: 'Create a GTM container and copy your Container ID (starts with GTM-)',
    trackingCodeTemplate: 'GTM-XXXXXXX',
    features: ['Tag management', 'Multiple providers', 'Event tracking', 'Custom triggers', 'Version control']
  },
  {
    id: 'facebook-pixel',
    name: 'Facebook Pixel',
    description: 'Track conversions and optimize Facebook ad campaigns',
    icon: '📘',
    setupInstructions: 'Create a Facebook Pixel in Business Manager and copy your Pixel ID',
    trackingCodeTemplate: 'XXXXXXXXXXXXXXX',
    features: ['Conversion tracking', 'Custom audiences', 'Ad optimization', 'Retargeting', 'Attribution']
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    description: 'Heatmaps, session recordings, and user feedback tools',
    icon: '🔥',
    setupInstructions: 'Sign up for Hotjar and copy your Site ID from the tracking code',
    trackingCodeTemplate: 'XXXXXXX',
    features: ['Heatmaps', 'Session recordings', 'Surveys', 'Feedback polls', 'Conversion funnels']
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Advanced event tracking and user analytics',
    icon: '🎯',
    setupInstructions: 'Create a Mixpanel project and copy your Project Token',
    trackingCodeTemplate: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    features: ['Event tracking', 'Funnel analysis', 'Cohort analysis', 'A/B testing', 'Retention analysis']
  },
  {
    id: 'plausible',
    name: 'Plausible Analytics',
    description: 'Privacy-focused, lightweight web analytics',
    icon: '🔒',
    setupInstructions: 'Add your domain to Plausible and use your domain name as the data-domain',
    trackingCodeTemplate: 'yourdomain.com',
    features: ['Privacy-friendly', 'GDPR compliant', 'Lightweight', 'Real-time stats', 'Goal tracking']
  }
]

interface AnalyticsIntegrationProps {
  onAnalyticsAdd: (provider: string, trackingId: string) => void
  onClose?: () => void
  currentIntegrations?: Array<{ provider: string; trackingId: string }>
}

export function AnalyticsIntegration({ 
  onAnalyticsAdd, 
  onClose, 
  currentIntegrations = [] 
}: AnalyticsIntegrationProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [trackingId, setTrackingId] = useState('')
  const [showSetup, setShowSetup] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const handleProviderSelect = (provider: AnalyticsProvider) => {
    setSelectedProvider(provider.id)
    setTrackingId('')
    setShowSetup(true)
  }

  const handleAdd = () => {
    if (selectedProvider && trackingId.trim()) {
      onAnalyticsAdd(selectedProvider, trackingId.trim())
      setSelectedProvider(null)
      setTrackingId('')
      setShowSetup(false)
    }
  }

  const generateTrackingCode = (provider: AnalyticsProvider, id: string) => {
    switch (provider.id) {
      case 'google-analytics':
        return `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`

      case 'google-tag-manager':
        return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`

      case 'facebook-pixel':
        return `<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"
/></noscript>`

      case 'hotjar':
        return `<!-- Hotjar Tracking Code -->
<script>
(function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:${id},hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`

      case 'plausible':
        return `<!-- Plausible Analytics -->
<script defer data-domain="${id}" src="https://plausible.io/js/script.js"></script>`

      default:
        return `<!-- ${provider.name} -->
<!-- Add your tracking code here -->`
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const isProviderActive = (providerId: string) => {
    return currentIntegrations.some(integration => integration.provider === providerId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Analytics Integration</h3>
      </div>

      {!showSetup ? (
        <>
          {/* Current Integrations */}
          {currentIntegrations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Active Integrations</h4>
              <div className="space-y-2">
                {currentIntegrations.map((integration, index) => {
                  const provider = analyticsProviders.find(p => p.id === integration.provider)
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{provider?.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{provider?.name}</div>
                          <div className="text-sm text-gray-500">ID: {integration.trackingId}</div>
                        </div>
                      </div>
                      <div className="text-green-600 text-sm font-medium">Active</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Available Providers */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Available Analytics Providers</h4>
            <div className="grid gap-3">
              {analyticsProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider)}
                  disabled={isProviderActive(provider.id)}
                  className={`p-4 rounded-lg border text-left transition-all hover:shadow-md ${
                    isProviderActive(provider.id)
                      ? 'border-green-200 bg-green-50 opacity-60 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-gray-900">{provider.name}</h5>
                        {isProviderActive(provider.id) && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {provider.features.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{provider.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Setup Form */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSetup(false)}
              className="mb-4"
            >
              ← Back to Providers
            </Button>

            {selectedProvider && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {analyticsProviders.find(p => p.id === selectedProvider)?.icon}
                  </span>
                  <h4 className="text-lg font-semibold">
                    Setup {analyticsProviders.find(p => p.id === selectedProvider)?.name}
                  </h4>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {analyticsProviders.find(p => p.id === selectedProvider)?.setupInstructions}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking ID
                  </label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder={analyticsProviders.find(p => p.id === selectedProvider)?.trackingCodeTemplate}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {trackingId.trim() && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Generated Tracking Code</h5>
                    <div className="relative">
                      <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                        <code>
                          {generateTrackingCode(
                            analyticsProviders.find(p => p.id === selectedProvider)!,
                            trackingId
                          )}
                        </code>
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateTrackingCode(
                          analyticsProviders.find(p => p.id === selectedProvider)!,
                          trackingId
                        ))}
                        className="absolute top-2 right-2"
                      >
                        {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleAdd}
                    disabled={!trackingId.trim()}
                    className="flex-1"
                  >
                    Add Integration
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSetup(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Analytics Benefits */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Why Add Analytics?</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Eye className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">Track Visitors</div>
              <div className="text-xs text-gray-600">See who visits your site</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MousePointer className="w-4 h-4 text-green-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">User Behavior</div>
              <div className="text-xs text-gray-600">Understand user actions</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">Conversions</div>
              <div className="text-xs text-gray-600">Measure success metrics</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Settings className="w-4 h-4 text-orange-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900">Optimization</div>
              <div className="text-xs text-gray-600">Improve performance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}