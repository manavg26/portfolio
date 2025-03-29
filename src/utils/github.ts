export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  topics: string[];
  homepage: string | null;
  stargazers_count: number;
  fork: boolean;
  language: string | null;
  updated_at: string;
}

/**
 * Fetches public repositories for a GitHub user
 * @param username GitHub username
 * @returns Array of repositories
 */
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  // Don't proceed with invalid usernames
  if (!username || username.trim() === '') {
    console.warn('Invalid GitHub username provided');
    return [];
  }
  
  try {
    console.log(`Fetching GitHub repos for: ${username}`);
    
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: 'force-cache' // Use cache first, then revalidate in background
    });

    if (!response.ok) {
      // Handle specific error status codes
      if (response.status === 404) {
        console.error(`GitHub user not found: ${username}`);
        return [];
      }
      
      if (response.status === 403) {
        console.error('GitHub API rate limit exceeded. Try again later.');
        return [];
      }
      
      throw new Error(`Failed to fetch GitHub repos: ${response.status} ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    if (!Array.isArray(repos)) {
      console.error('Expected array of repos but received:', typeof repos);
      return [];
    }
    
    console.log(`Successfully fetched ${repos.length} repos for ${username}`);
    
    // Filter out forked repos and sort by updated date
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return empty array on error rather than failing
    return [];
  }
}

/**
 * Extracts a GitHub username from a full GitHub URL
 * @param githubUrl Full GitHub profile URL
 * @returns GitHub username
 */
export function extractGitHubUsername(githubUrl: string): string {
  if (!githubUrl) return '';
  
  try {
    // Handle various GitHub URL formats
    const regex = /github\.com\/([^\/\s]+)/;
    const match = githubUrl.match(regex);
    return match ? match[1] : '';
  } catch (error) {
    console.error('Error extracting GitHub username:', error);
    return '';
  }
}

/**
 * Determines the color for a programming language
 * @param language Programming language name
 * @returns Hex color code
 */
export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Ruby: '#701516',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    PowerShell: '#012456',
    Vue: '#41b883',
    React: '#61dafb',
    Angular: '#dd1b16',
  };

  return language && colors[language] ? colors[language] : '#6e7781';
} 