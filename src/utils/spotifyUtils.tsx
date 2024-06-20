interface Artist {
    id: string;
    name: string;
  }
  
  export const fetchTopArtists = async (token: string): Promise<Artist[][]> => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=49", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 401) {
        logout();
        return [[], [], []];
      }
  
      const data = await response.json();
      let artists = data.items;
      const guest = artists[0];
      const groupedArtists: Artist[][] = [[], [], []];
      
      artists = artists.slice(1);
      for (let i = 0; i < artists.length; i++) {
        groupedArtists[i % 3].push(artists[i]);
      }
      
      groupedArtists.unshift([guest]);
      return groupedArtists;
    } catch (error) {
      console.error("Error fetching top artists:", error);
      logout();
      return [[], [], [], []];
    }
  };
  
  export const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };
  