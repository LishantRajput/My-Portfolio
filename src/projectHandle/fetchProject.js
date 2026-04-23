 export const fetchproject = async ()=>{

        try {
            const res = await fetch(`${BASE_URL}/auth/find/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectType)
      })
      const data = await res.json()
      console.log(data)
         

        } catch (error) {
            console.log(error);
        }
    }
