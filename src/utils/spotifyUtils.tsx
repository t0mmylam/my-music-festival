interface Artist {
    id: string;
    name: string;
  }
  
  export const fetchTopArtists = async (token: string): Promise<Artist[][]> => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=48", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 401) {
        logout();
        return [[], [], []];
      }
  
      const data = await response.json();
      const artists = data.items;
  
      const groupedArtists: Artist[][] = [[], [], []];
  
      for (let i = 0; i < artists.length; i++) {
        groupedArtists[i % 3].push(artists[i]);
      }
  
      return groupedArtists;
    } catch (error) {
      console.error("Error fetching top artists:", error);
      logout();
      return [[], [], []];
    }
  };
  
  export const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };
  