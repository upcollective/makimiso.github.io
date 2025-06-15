/**
 * Makimiso CMS API Integration
 * Simple JavaScript functions to fetch content from your Strapi CMS
 */

// Configuration
const CMS_BASE_URL = 'https://makimiso-cms-production.up.railway.app'; // Production Railway URL
const API_URL = `${CMS_BASE_URL}/api`;

/**
 * Generic API fetch function with error handling
 */
async function fetchFromCMS(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from CMS: ${endpoint}`, error);
    return null;
  }
}

/**
 * Blog Posts API Functions
 */

// Get all published blog posts
async function getBlogPosts(limit = null) {
  const params = new URLSearchParams({
    'filters[published][$eq]': 'true',
    'sort': 'published_date:desc',
    'populate': 'featured_image'
  });
  
  if (limit) {
    params.append('pagination[limit]', limit);
  }

  return await fetchFromCMS(`/blog-posts?${params}`);
}

// Get latest blog posts for homepage
async function getLatestBlogPosts(count = 3) {
  return await getBlogPosts(count);
}

// Get a single blog post by slug
async function getBlogPostBySlug(slug) {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'filters[published][$eq]': 'true',
    'populate': 'featured_image'
  });

  const result = await fetchFromCMS(`/blog-posts?${params}`);
  return result?.data?.[0] || null;
}

// Get a single blog post by ID
async function getBlogPostById(id) {
  return await fetchFromCMS(`/blog-posts/${id}?populate=featured_image`);
}

/**
 * Portfolio API Functions
 */

// Get all published portfolio items
async function getPortfolioItems(limit = null) {
  const params = new URLSearchParams({
    'filters[published][$eq]': 'true',
    'sort': 'project_date:desc',
    'populate': ['featured_image', 'images']
  });
  
  if (limit) {
    params.append('pagination[limit]', limit);
  }

  return await fetchFromCMS(`/portfolio-items?${params}`);
}

// Get a single portfolio item by slug
async function getPortfolioItemBySlug(slug) {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'filters[published][$eq]': 'true',
    'populate': ['featured_image', 'images']
  });

  const result = await fetchFromCMS(`/portfolio-items?${params}`);
  return result?.data?.[0] || null;
}

// Get a single portfolio item by ID
async function getPortfolioItemById(id) {
  return await fetchFromCMS(`/portfolio-items/${id}?populate=featured_image,images`);
}

/**
 * Utility Functions
 */

// Format Strapi date to readable format
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get image URL from Strapi media object
function getImageUrl(mediaObject) {
  if (!mediaObject?.data?.attributes?.url) return null;
  
  const url = mediaObject.data.attributes.url;
  // If URL is relative, prepend the CMS base URL
  return url.startsWith('http') ? url : `${CMS_BASE_URL}${url}`;
}

// Extract excerpt from content if not provided
function getExcerpt(content, length = 150) {
  if (!content) return '';
  
  // Strip HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= length) return plainText;
  
  return plainText.substring(0, length).trim() + '...';
}

/**
 * Export functions for use in different environments
 */
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = {
    getBlogPosts,
    getLatestBlogPosts,
    getBlogPostBySlug,
    getBlogPostById,
    getPortfolioItems,
    getPortfolioItemBySlug,
    getPortfolioItemById,
    formatDate,
    getImageUrl,
    getExcerpt
  };
} else {
  // Browser environment - functions are already in global scope
  window.MakimisoCMS = {
    getBlogPosts,
    getLatestBlogPosts,
    getBlogPostBySlug,
    getBlogPostById,
    getPortfolioItems,
    getPortfolioItemBySlug,
    getPortfolioItemById,
    formatDate,
    getImageUrl,
    getExcerpt
  };
}