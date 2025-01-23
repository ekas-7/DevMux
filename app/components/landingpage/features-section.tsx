import React from 'react';
import { 
  Code, 
  FileText, 
  MessageSquare, 
  Layout, 
  Settings, 
  Network 
} from 'lucide-react';

const features = [
  {
    icon: Code,
    title: "IDE",
    description: "Advanced development environment with intelligent coding assistance.",
    color: "bg-gray-800",
  },
  {
    icon: FileText,
    title: "Canvas",
    description: "Visual design space for system architecture and planning.",
    color: "bg-gray-800",
  },
  {
    icon: MessageSquare,
    title: "Chat",
    description: "AI-powered team communication platform.",
    color: "bg-gray-800",
  },
  {
    icon: Layout,
    title: "Workspace",
    description: "Customizable interface for seamless project management.",
    color: "bg-gray-800",
  },
  {
    icon: Settings,
    title: "Integrations",
    description: "Connect with your favorite development tools and services.",
    color: "bg-gray-800",
  },
  {
    icon: Network,
    title: "Collaboration",
    description: "Real-time team coordination and knowledge sharing.",
    color: "bg-gray-800",
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Platform Features
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          An integrated platform combining LLM power with system design, coding, and team communication.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}