'use client'

import { BaseSection } from '../base-section'
import { SectionData } from '@/lib/types'
import { Linkedin, Twitter, Github } from 'lucide-react'

interface AboutTeamProps {
  data: SectionData
  onUpdate: (updates: Partial<SectionData>) => void
  isEditing?: boolean
}

export function AboutTeam({ data = { content: {} }, onUpdate, isEditing }: AboutTeamProps) {
  const { content = {} } = data || {}

  const defaultContent = {
    title: 'Meet Our Team',
    subtitle: 'The passionate people behind our success',
    teamMembers: [
      {
        name: 'Sarah Johnson',
        position: 'CEO & Founder',
        bio: 'Former tech executive with 15+ years of experience building world-class products.',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTAwIDE0MEM3NS44IDE0MCA1NiAxNTkuOCA1NiAxODRIMTQ0QzE0NCAxNTkuOCAxMjQuMiAxNDAgMTAwIDE0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
        social: {
          linkedin: '#',
          twitter: '#',
          github: '#'
        }
      },
      {
        name: 'Michael Chen',
        position: 'CTO',
        bio: 'Full-stack engineer and architect who loves building scalable systems.',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRUZGNkZGIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTAwIDE0MEM3NS44IDE0MCA1NiAxNTkuOCA1NiAxODRIMTQ0QzE0NCAxNTkuOCAxMjQuMiAxNDAgMTAwIDE0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
        social: {
          linkedin: '#',
          twitter: '#',
          github: '#'
        }
      },
      {
        name: 'Emily Rodriguez',
        position: 'Head of Design',
        bio: 'Design leader passionate about creating beautiful, user-centered experiences.',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkVGM0Y0Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTAwIDE0MEM3NS44IDE0MCA1NiAxNTkuOCA1NiAxODRIMTQ0QzE0NCAxNTkuOCAxMjQuMiAxNDAgMTAwIDE0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
        social: {
          linkedin: '#',
          twitter: '#',
          github: '#'
        }
      },
      {
        name: 'David Kim',
        position: 'VP of Engineering',
        bio: 'Engineering leader focused on building high-performance, reliable systems.',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGREZGIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTAwIDE0MEM3NS44IDE0MCA1NiAxNTkuOCA1NiAxODRIMTQ0QzE0NCAxNTkuOCAxMjQuMiAxNDAgMTAwIDE0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
        social: {
          linkedin: '#',
          twitter: '#',
          github: '#'
        }
      }
    ]
  }

  const currentContent = { ...defaultContent, ...content }

  const handleContentChange = (field: string, value: any) => {
    if (onUpdate) {
      onUpdate({
        content: {
          ...currentContent,
          [field]: value
      }
        })
    }
  }

  return (
    <BaseSection className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {isEditing ? (
            <input
              value={currentContent.title}
              onChange={(e) => handleContentChange('title', e.target.value)}
              className="text-3xl md:text-4xl font-bold text-gray-900 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full max-w-2xl mx-auto text-center"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentContent.title}
            </h2>
          )}
          
          {isEditing ? (
            <textarea
              value={currentContent.subtitle}
              onChange={(e) => handleContentChange('subtitle', e.target.value)}
              className="text-lg text-gray-600 bg-transparent border-2 border-dashed border-blue-300 rounded p-2 w-full max-w-2xl mx-auto resize-none"
              rows={2}
            />
          ) : (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentContent.subtitle}
            </p>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentContent.teamMembers.map((member: any, index: number) => (
            <div
              key={index}
              className="group text-center"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-gray-100 group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </a>
                    <a
                      href={member.social.github}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <Github className="w-5 h-5 text-gray-800" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div>
                {isEditing ? (
                  <input
                    value={member.name}
                    onChange={(e) => {
                      const updatedMembers = [...currentContent.teamMembers]
                      updatedMembers[index] = { ...updatedMembers[index], name: e.target.value }
                      handleContentChange('teamMembers', updatedMembers)
                    }}
                    className="text-xl font-semibold text-gray-900 bg-transparent border border-gray-300 rounded p-1 w-full mb-2"
                  />
                ) : (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                )}

                {isEditing ? (
                  <input
                    value={member.position}
                    onChange={(e) => {
                      const updatedMembers = [...currentContent.teamMembers]
                      updatedMembers[index] = { ...updatedMembers[index], position: e.target.value }
                      handleContentChange('teamMembers', updatedMembers)
                    }}
                    className="text-blue-600 font-medium bg-transparent border border-gray-300 rounded p-1 w-full mb-3"
                  />
                ) : (
                  <p className="text-blue-600 font-medium mb-3">
                    {member.position}
                  </p>
                )}

                {isEditing ? (
                  <textarea
                    value={member.bio}
                    onChange={(e) => {
                      const updatedMembers = [...currentContent.teamMembers]
                      updatedMembers[index] = { ...updatedMembers[index], bio: e.target.value }
                      handleContentChange('teamMembers', updatedMembers)
                    }}
                    className="text-gray-600 bg-transparent border border-gray-300 rounded p-2 w-full resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals who share our passion for innovation and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                View Open Positions
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Learn About Our Culture
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  )
}