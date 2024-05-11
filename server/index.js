const axios = require("axios");

// Handler function for serverless environment
module.exports = async (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Check for preflight requests (OPTIONS) and return early
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse request parameters
  const { path, query } = req;

  // Handle different paths
  switch (path) {
    case '/all-news':
      return getAllNews(query, res);
    case '/top-headlines':
      return getTopHeadlines(query, res);
    case '/country/:iso':
      return getCountryNews(req.params.iso, query, res);
    default:
      return res.status(404).json({ error: 'Route not found' });
  }
};

// Helper function to fetch all news
async function getAllNews(query, res) {
  let pageSize = parseInt(query.pageSize) || 80;
  let page = parseInt(query.page) || 1;

  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: 'page',
        pageSize,
        page,
        apiKey: process.env.API_KEY
      }
    });

    return handleResponse(response, res);
  } catch (error) {
    return handleError(error, res);
  }
}

// Helper function to fetch top headlines
async function getTopHeadlines(query, res) {
  let pageSize = parseInt(query.pageSize) || 80;
  let page = parseInt(query.page) || 1;
  let category = query.category || 'business';

  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category,
        language: 'en',
        page,
        pageSize,
        apiKey: process.env.API_KEY
      }
    });

    return handleResponse(response, res);
  } catch (error) {
    return handleError(error, res);
  }
}

// Helper function to fetch news by country
async function getCountryNews(iso, query, res) {
  let pageSize = parseInt(query.pageSize) || 80;
  let page = parseInt(query.page) || 1;

  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: iso,
        page,
        pageSize,
        apiKey: process.env.API_KEY
      }
    });

    return handleResponse(response, res);
  } catch (error) {
    return handleError(error, res);
  }
}

// Helper function to handle API response
function handleResponse(response, res) {
  if (response.data.totalResults > 0) {
    return res.json({
      status: 200,
      success: true,
      message: 'Successfully fetched the data',
      data: response.data
    });
  } else {
    return res.json({
      status: 200,
      success: true,
      message: 'No more results to show'
    });
  }
}

// Helper function to handle API errors
function handleError(error, res) {
  console.error('Failed to fetch data from the API:', error);
  return res.status(500).json({
    status: 500,
    success: false,
    message: 'Failed to fetch data from the API',
    error: error.message
  });
}
