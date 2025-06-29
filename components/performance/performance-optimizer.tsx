'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Zap, CheckCircle, Info, Optimize, TrendingUp } from 'lucide-react'
import { usePageStore } from '@/lib/page-store'

interface PerformanceIssue {
  id: string
  type: 'error' | 'warning' | 'info'
  category: 'images' | 'content' | 'structure' | 'seo' | 'accessibility'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  autoFixable: boolean
  suggestion: string
}

interface PerformanceMetrics {
  totalSections: number
  imageCount: number
  averageImageSize: number
  duplicateContent: number
  missingAltText: number
  longTextBlocks: number
  heavySections: string[]
  score: number
}

export function PerformanceOptimizer() {
  const { sections } = usePageStore()
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [issues, setIssues] = useState<PerformanceIssue[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [optimizationApplied, setOptimizationApplied] = useState<string[]>([])

  useEffect(() => {
    if (sections.length > 0) {
      analyzePerformance()
    }
  }, [sections, analyzePerformance])

  const analyzePerformance = useCallback(() => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      const analysis = performAnalysis()
      setMetrics(analysis.metrics)
      setIssues(analysis.issues)
      setIsAnalyzing(false)
    }, 1000) // Simulate analysis time
  }, [sections])

  const performAnalysis = () => {
    const metrics: PerformanceMetrics = {
      totalSections: sections.length,
      imageCount: 0,
      averageImageSize: 0,
      duplicateContent: 0,
      missingAltText: 0,
      longTextBlocks: 0,
      heavySections: [],
      score: 0
    }

    const issues: PerformanceIssue[] = []
    const imageUrls: string[] = []
    const textContents: string[] = []

    // Analyze each section
    sections.forEach((section, index) => {
      const content = section.content || {}
      
      // Check for images
      Object.keys(content).forEach(key => {
        if (key.includes('image') || key.includes('Image') || key.includes('avatar') || key.includes('photo')) {
          const imageUrl = content[key]
          if (imageUrl && typeof imageUrl === 'string') {
            metrics.imageCount++
            imageUrls.push(imageUrl)
            
            // Check for missing alt text
            const altKey = key.replace(/image|Image/i, 'alt').replace(/Url|URL/i, '')
            if (!content[altKey] && !content[`${altKey}Text`] && !content[`${key}Alt`]) {
              metrics.missingAltText++
              issues.push({
                id: `missing-alt-${section.id}-${key}`,
                type: 'warning',
                category: 'accessibility',
                title: 'Missing Alt Text',
                description: `Image in section ${index + 1} is missing alt text`,
                impact: 'medium',
                autoFixable: false,
                suggestion: 'Add descriptive alt text for better accessibility and SEO'
              })
            }

            // Check for external images (potential performance issue)
            if (imageUrl.startsWith('http') && !imageUrl.includes(window.location.hostname)) {
              issues.push({
                id: `external-image-${section.id}-${key}`,
                type: 'info',
                category: 'images',
                title: 'External Image',
                description: `External image may slow down loading: ${imageUrl.substring(0, 50)}...`,
                impact: 'low',
                autoFixable: false,
                suggestion: 'Consider hosting images locally or using a CDN'
              })
            }
          }
        }
      })

      // Check for long text blocks
      Object.keys(content).forEach(key => {
        const value = content[key]
        if (typeof value === 'string' && value.length > 500) {
          metrics.longTextBlocks++
          if (value.length > 1000) {
            issues.push({
              id: `long-text-${section.id}-${key}`,
              type: 'warning',
              category: 'content',
              title: 'Very Long Text Block',
              description: `Text in section ${index + 1} is ${value.length} characters long`,
              impact: 'medium',
              autoFixable: false,
              suggestion: 'Consider breaking long text into smaller paragraphs or sections'
            })
          }
        }
        
        // Collect text for duplicate checking
        if (typeof value === 'string' && value.trim().length > 20) {
          textContents.push(value.toLowerCase().trim())
        }
      })

      // Check for heavy sections (too many features/items)
      if (content.features && Array.isArray(content.features) && content.features.length > 6) {
        metrics.heavySections.push(section.id)
        issues.push({
          id: `heavy-section-${section.id}`,
          type: 'info',
          category: 'structure',
          title: 'Section with Many Items',
          description: `Section ${index + 1} has ${content.features.length} features`,
          impact: 'low',
          autoFixable: false,
          suggestion: 'Consider splitting into multiple sections for better user experience'
        })
      }
    })

    // Check for duplicate content
    const duplicates = textContents.filter((item, index) => textContents.indexOf(item) !== index)
    metrics.duplicateContent = new Set(duplicates).size

    if (metrics.duplicateContent > 0) {
      issues.push({
        id: 'duplicate-content',
        type: 'warning',
        category: 'content',
        title: 'Duplicate Content Detected',
        description: `${metrics.duplicateContent} pieces of duplicate content found`,
        impact: 'medium',
        autoFixable: false,
        suggestion: 'Review and remove or modify duplicate content for better SEO'
      })
    }

    // Check page structure
    if (sections.length === 0) {
      issues.push({
        id: 'no-content',
        type: 'error',
        category: 'structure',
        title: 'No Content',
        description: 'Your page has no sections',
        impact: 'high',
        autoFixable: false,
        suggestion: 'Add at least a header, hero, and footer section'
      })
    }

    if (sections.length > 15) {
      issues.push({
        id: 'too-many-sections',
        type: 'warning',
        category: 'structure',
        title: 'Many Sections',
        description: `Your page has ${sections.length} sections`,
        impact: 'medium',
        autoFixable: false,
        suggestion: 'Consider combining related sections or splitting into multiple pages'
      })
    }

    // Calculate performance score (0-100)
    let score = 100
    issues.forEach(issue => {
      if (issue.impact === 'high') score -= 15
      else if (issue.impact === 'medium') score -= 8
      else score -= 3
    })
    metrics.score = Math.max(0, Math.min(100, score))

    return { metrics, issues }
  }

  const applyOptimization = (issueId: string) => {
    // Simulate applying optimization
    setOptimizationApplied(prev => [...prev, issueId])
    
    // Remove the issue from the list
    setIssues(prev => prev.filter(issue => issue.id !== issueId))
    
    // Recalculate score
    if (metrics) {
      const newScore = Math.min(100, metrics.score + 5)
      setMetrics(prev => prev ? { ...prev, score: newScore } : null)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 50) return 'Needs Improvement'
    return 'Poor'
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'images': return '🖼️'
      case 'content': return '📝'
      case 'structure': return '🏗️'
      case 'seo': return '🔍'
      case 'accessibility': return '♿'
      default: return '⚡'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Performance Optimizer</h3>
      </div>

      {/* Performance Score */}
      {metrics && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Performance Score</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={analyzePerformance}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Re-analyze
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl font-bold">
              <span className={getScoreColor(metrics.score)}>{metrics.score}</span>
              <span className="text-gray-400 text-xl">/100</span>
            </div>
            <div>
              <div className={`text-lg font-semibold ${getScoreColor(metrics.score)}`}>
                {getScoreLabel(metrics.score)}
              </div>
              <div className="text-sm text-gray-600">
                {issues.length} issue{issues.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{metrics.totalSections}</div>
              <div className="text-gray-600">Sections</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{metrics.imageCount}</div>
              <div className="text-gray-600">Images</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{metrics.missingAltText}</div>
              <div className="text-gray-600">Missing Alt Text</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{metrics.duplicateContent}</div>
              <div className="text-gray-600">Duplicates</div>
            </div>
          </div>
        </div>
      )}

      {/* Issues List */}
      {issues.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Issues & Recommendations</h4>
          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`p-4 border rounded-lg ${
                  issue.type === 'error' ? 'border-red-200 bg-red-50' :
                  issue.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-lg">
                      {getCategoryIcon(issue.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-gray-900">{issue.title}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          issue.impact === 'high' ? 'bg-red-100 text-red-800' :
                          issue.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {issue.impact} impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                      <p className="text-sm text-gray-700 italic">{issue.suggestion}</p>
                    </div>
                  </div>
                  
                  {issue.autoFixable && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyOptimization(issue.id)}
                    >
                      <Optimize className="w-3 h-3 mr-1" />
                      Fix
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimizations Applied */}
      {optimizationApplied.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <h5 className="font-medium text-green-900">Optimizations Applied</h5>
          </div>
          <p className="text-sm text-green-800">
            {optimizationApplied.length} optimization{optimizationApplied.length !== 1 ? 's' : ''} applied successfully!
          </p>
        </div>
      )}

      {/* Performance Tips */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Tips</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <strong>Optimize Images:</strong> Use WebP format, compress images, and include alt text for better loading and accessibility.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <strong>Content Strategy:</strong> Keep text concise, avoid duplicates, and structure content for easy scanning.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <strong>Page Structure:</strong> Limit sections to 10-12 for optimal user experience and loading performance.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <strong>Mobile First:</strong> Design for mobile devices first, then enhance for larger screens.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}