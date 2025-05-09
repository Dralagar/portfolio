import { google } from 'googleapis';

const youtube = google.youtube('v3');

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  tags: string[];
  series?: string;
  theme?: string;
  playlistId?: string;
  isPodcast?: boolean;
  episodeNumber?: number;
}

export class YouTubeService {
  private apiKey: string;
  private channelId: string;

  constructor(apiKey: string, channelId: string) {
    this.apiKey = apiKey;
    this.channelId = channelId;
  }

  async getChannelVideos(maxResults: number = 10): Promise<YouTubeVideo[]> {
    try {
      const response = await youtube.search.list({
        key: this.apiKey,
        channelId: this.channelId,
        part: ['snippet'],
        order: 'date',
        maxResults,
        type: ['video']
      });

      const videoIds = response.data.items?.map((item: any) => item.id?.videoId).filter(Boolean) as string[];
      
      if (!videoIds.length) return [];

      const videoDetails = await youtube.videos.list({
        key: this.apiKey,
        part: ['snippet', 'contentDetails', 'statistics'],
        id: videoIds
      });

      return videoDetails.data.items?.map((video: any) => ({
        id: video.id!,
        title: video.snippet?.title!,
        description: video.snippet?.description!,
        thumbnailUrl: video.snippet?.thumbnails?.high?.url!,
        publishedAt: video.snippet?.publishedAt!,
        duration: video.contentDetails?.duration!,
        viewCount: parseInt(video.statistics?.viewCount || '0'),
        likeCount: parseInt(video.statistics?.likeCount || '0'),
        tags: video.snippet?.tags || [],
        series: this.extractSeriesFromTags(video.snippet?.tags || []),
        theme: this.extractThemeFromTags(video.snippet?.tags || [])
      })) || [];
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  }

  async getPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
    try {
      const response = await youtube.playlistItems.list({
        key: this.apiKey,
        playlistId,
        part: ['snippet'],
        maxResults: 50
      });

      const videoIds = response.data.items?.map((item: { snippet?: { resourceId?: { videoId?: string } } }) => item.snippet?.resourceId?.videoId).filter(Boolean) as string[];
      
      if (!videoIds.length) return [];

      const videoDetails = await youtube.videos.list({
        key: this.apiKey,
        part: ['snippet', 'contentDetails', 'statistics'],
        id: videoIds
      });

      return videoDetails.data.items?.map((video: any) => ({
        id: video.id!,
        title: video.snippet?.title!,
        description: video.snippet?.description!,
        thumbnailUrl: video.snippet?.thumbnails?.high?.url!,
        publishedAt: video.snippet?.publishedAt!,
        duration: video.contentDetails?.duration!,
        viewCount: parseInt(video.statistics?.viewCount || '0'),
        likeCount: parseInt(video.statistics?.likeCount || '0'),
        tags: video.snippet?.tags || [],
        series: this.extractSeriesFromTags(video.snippet?.tags || []),
        theme: this.extractThemeFromTags(video.snippet?.tags || []),
        playlistId
      })) || [];
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
      throw error;
    }
  }

  async getPodcastEpisodes(maxResults: number = 10): Promise<YouTubeVideo[]> {
    try {
      const response = await youtube.search.list({
        key: this.apiKey,
        channelId: this.channelId,
        part: ['snippet'],
        order: 'date',
        maxResults,
        type: ['video'],
        q: 'podcast' // Search for videos with "podcast" in title/description
      });

      const videoIds = response.data.items?.map((item: any) => item.id?.videoId).filter(Boolean) as string[];
      
      if (!videoIds.length) return [];

      const videoDetails = await youtube.videos.list({
        key: this.apiKey,
        part: ['snippet', 'contentDetails', 'statistics'],
        id: videoIds
      });

      return videoDetails.data.items?.map((video: any) => ({
        id: video.id!,
        title: video.snippet?.title!,
        description: video.snippet?.description!,
        thumbnailUrl: video.snippet?.thumbnails?.high?.url!,
        publishedAt: video.snippet?.publishedAt!,
        duration: video.contentDetails?.duration!,
        viewCount: parseInt(video.statistics?.viewCount || '0'),
        likeCount: parseInt(video.statistics?.likeCount || '0'),
        tags: video.snippet?.tags || [],
        series: this.extractSeriesFromTags(video.snippet?.tags || []),
        theme: this.extractThemeFromTags(video.snippet?.tags || []),
        isPodcast: true,
        episodeNumber: this.extractEpisodeNumber(video.snippet?.title || '')
      })) || [];
    } catch (error) {
      console.error('Error fetching podcast episodes:', error);
      throw error;
    }
  }

  private extractSeriesFromTags(tags: string[]): string | undefined {
    const seriesTag = tags.find(tag => tag.startsWith('series:'));
    return seriesTag ? seriesTag.replace('series:', '') : undefined;
  }

  private extractThemeFromTags(tags: string[]): string | undefined {
    const themeTag = tags.find(tag => tag.startsWith('theme:'));
    return themeTag ? themeTag.replace('theme:', '') : undefined;
  }

  private extractEpisodeNumber(title: string): number | undefined {
    const match = title.match(/Episode\s+(\d+)/i);
    return match ? parseInt(match[1]) : undefined;
  }
} 