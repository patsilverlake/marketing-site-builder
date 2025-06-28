'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Copy, Check, Share, Link, Eye, Clock, Settings } from 'lucide-react'
import { usePageStore } from '@/lib/page-store'

interface ShareLink {
  id: string
  url: string
  shortCode: string
  password?: string
  expiresAt?: Date
  views: number
  maxViews?: number
  createdAt: Date
  isActive: boolean
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { sections } = usePageStore()
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Advanced settings
  const [password, setPassword] = useState('')
  const [expirationDays, setExpirationDays] = useState<number | ''>('')
  const [maxViews, setMaxViews] = useState<number | ''>('')

  useEffect(() => {
    // Load existing share links from localStorage
    const saved = localStorage.getItem('marketing-site-builder-share-links')
    if (saved) {
      try {
        const links = JSON.parse(saved).map((link: any) => ({
          ...link,
          createdAt: new Date(link.createdAt),
          expiresAt: link.expiresAt ? new Date(link.expiresAt) : undefined
        }))
        setShareLinks(links)
      } catch (error) {
        console.error('Failed to load share links:', error)
      }
    }
  }, [])

  const saveShareLinks = (links: ShareLink[]) => {
    localStorage.setItem('marketing-site-builder-share-links', JSON.stringify(links))
    setShareLinks(links)
  }

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const generateShareableData = () => {
    return {
      sections: sections.map(section => ({
        id: section.id,
        type: section.type,
        variationId: section.variationId,
        content: section.content,
        order: section.order
      })),
      metadata: {
        title: 'Shared Landing Page',
        createdAt: new Date().toISOString(),
        builderVersion: '1.0.0'
      }
    }
  }

  const createShareLink = async () => {
    if (sections.length === 0) {
      alert('Please add some sections before sharing')
      return
    }

    setIsCreating(true)
    
    try {
      const shortCode = generateShortCode()
      const shareableData = generateShareableData()
      
      // In a real implementation, this would be sent to a backend
      // For now, we'll store it in localStorage with the short code
      const shareData = {
        shortCode,
        data: shareableData,
        password: password || undefined,
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem(`share-${shortCode}`, JSON.stringify(shareData))
      
      const expiresAt = expirationDays ? new Date(Date.now() + Number(expirationDays) * 24 * 60 * 60 * 1000) : undefined
      
      const newLink: ShareLink = {
        id: crypto.randomUUID(),
        url: `${window.location.origin}/shared/${shortCode}`,
        shortCode,
        password: password || undefined,
        expiresAt,
        views: 0,
        maxViews: maxViews ? Number(maxViews) : undefined,
        createdAt: new Date(),
        isActive: true
      }
      
      const updatedLinks = [newLink, ...shareLinks]
      saveShareLinks(updatedLinks)
      
      // Reset form
      setPassword('')
      setExpirationDays('')
      setMaxViews('')
      setShowAdvanced(false)
      
    } catch (error) {
      console.error('Failed to create share link:', error)
      alert('Failed to create share link. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleLinkStatus = (linkId: string) => {
    const updatedLinks = shareLinks.map(link =>
      link.id === linkId ? { ...link, isActive: !link.isActive } : link
    )
    saveShareLinks(updatedLinks)
  }

  const deleteLink = (linkId: string) => {
    const link = shareLinks.find(l => l.id === linkId)
    if (link) {
      localStorage.removeItem(`share-${link.shortCode}`)
    }
    const updatedLinks = shareLinks.filter(link => link.id !== linkId)
    saveShareLinks(updatedLinks)
  }

  const isLinkExpired = (link: ShareLink) => {
    if (!link.expiresAt) return false
    return new Date() > link.expiresAt
  }

  const isLinkMaxedOut = (link: ShareLink) => {
    if (!link.maxViews) return false
    return link.views >= link.maxViews
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Share className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Share Preview</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Create New Share Link */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Share Link</h3>
            
            <div className="space-y-4">
              {/* Advanced Options Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings className="w-4 h-4 mr-2" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </Button>

              {/* Advanced Settings */}
              {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password Protection
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Optional password"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expires in (days)
                    </label>
                    <input
                      type="number"
                      value={expirationDays}
                      onChange={(e) => setExpirationDays(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Never"
                      min="1"
                      max="365"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Views
                    </label>
                    <input
                      type="number"
                      value={maxViews}
                      onChange={(e) => setMaxViews(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Unlimited"
                      min="1"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={createShareLink}
                disabled={isCreating || sections.length === 0}
                className="w-full"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Link...
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4 mr-2" />
                    Create Share Link
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Existing Share Links */}
          {shareLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Share Links</h3>
              <div className="space-y-3">
                {shareLinks.map((link) => {
                  const isExpired = isLinkExpired(link)
                  const isMaxedOut = isLinkMaxedOut(link)
                  const isInactive = !link.isActive || isExpired || isMaxedOut

                  return (
                    <div
                      key={link.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        isInactive 
                          ? 'border-gray-200 bg-gray-50' 
                          : 'border-green-200 bg-green-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
                              {link.shortCode}
                            </code>
                            
                            {link.password && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                🔒 Protected
                              </span>
                            )}
                            
                            <span className={`text-xs px-2 py-1 rounded ${
                              isInactive
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {isExpired ? 'Expired' : 
                               isMaxedOut ? 'Max Views Reached' :
                               !link.isActive ? 'Disabled' : 'Active'}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-2 font-mono break-all">
                            {link.url}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {link.views} view{link.views !== 1 ? 's' : ''}
                              {link.maxViews && ` / ${link.maxViews}`}
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {link.createdAt.toLocaleDateString()}
                            </div>
                            
                            {link.expiresAt && (
                              <div>
                                Expires: {link.expiresAt.toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(link.url, link.id)}
                            disabled={isInactive}
                          >
                            {copiedId === link.id ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleLinkStatus(link.id)}
                            disabled={isExpired || isMaxedOut}
                          >
                            {link.isActive ? '⏸️' : '▶️'}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteLink(link.id)}
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">How it works</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Share links contain a snapshot of your current page design</li>
              <li>• Links work even if you continue editing your page</li>
              <li>• Viewers can see your page but cannot edit it</li>
              <li>• Add password protection or expiration dates for extra security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}