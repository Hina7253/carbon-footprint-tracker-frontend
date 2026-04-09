import { Analysis } from '../store/appStore';

export function generateMockAnalysis(url: string): Analysis {
  const pageSize = parseFloat((Math.random() * 4 + 0.5).toFixed(2));
  const co2Emission = parseFloat((pageSize * 0.4 + Math.random() * 0.3).toFixed(2));
  const loadTime = parseFloat((pageSize * 0.8 + Math.random() * 0.5).toFixed(2));
  const performanceScore = Math.max(40, Math.min(99, Math.floor(100 - pageSize * 15 - Math.random() * 10)));

  const resources = [
    ...Array.from({ length: Math.floor(Math.random() * 20 + 10) }, (_, i) => ({
      id: `img-${i}`,
      url: `${url}/image-${i}.jpg`,
      type: 'image' as const,
      size: Math.random() * 500,
      carbon: Math.random() * 0.2,
    })),
    ...Array.from({ length: Math.floor(Math.random() * 8 + 3) }, (_, i) => ({
      id: `script-${i}`,
      url: `${url}/script-${i}.js`,
      type: 'script' as const,
      size: Math.random() * 200,
      carbon: Math.random() * 0.15,
    })),
    ...Array.from({ length: Math.floor(Math.random() * 5 + 1) }, (_, i) => ({
      id: `css-${i}`,
      url: `${url}/style-${i}.css`,
      type: 'stylesheet' as const,
      size: Math.random() * 100,
      carbon: Math.random() * 0.1,
    })),
    ...Array.from({ length: Math.floor(Math.random() * 3 + 1) }, (_, i) => ({
      id: `font-${i}`,
      url: `${url}/font-${i}.woff2`,
      type: 'font' as const,
      size: Math.random() * 150,
      carbon: Math.random() * 0.08,
    })),
  ];

  return {
    url,
    pageSize,
    co2Emission,
    loadTime,
    totalResources: resources.length,
    performanceScore,
    resources,
  };
}

export const aiSuggestions = [
  {
    category: 'Images',
    icon: 'image',
    suggestions: [
      'Compress images to WebP format',
      'Implement responsive images',
      'Use lazy loading for below-fold images',
      'Optimize with CDN delivery',
    ],
  },
  {
    category: 'Scripts',
    icon: 'code',
    suggestions: [
      'Minimize and bundle JavaScript',
      'Defer non-critical scripts',
      'Remove unused dependencies',
      'Implement code splitting',
    ],
  },
  {
    category: 'Performance',
    icon: 'zap',
    suggestions: [
      'Enable browser caching',
      'Compress text resources with GZIP',
      'Optimize font loading',
      'Use HTTP/2 push for critical assets',
    ],
  },
  {
    category: 'Green Hosting',
    icon: 'leaf',
    suggestions: [
      'Switch to renewable energy hosting',
      'Use a CDN with green datacenters',
      'Optimize database queries',
      'Monitor and reduce server resources',
    ],
  },
];
