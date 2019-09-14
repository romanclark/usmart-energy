const rules = {
    visitor: {
      static: [/*"posts:list",*/ "home-page:visit", "about-page:visit"]
    },
    user: {
      static: [
        // "posts:list",
        // "posts:create",
        "users:getSelf",
        "home-page:visit",
        "profile-page:visit",
        "user-pages:visit",
        "finance-pages:visit",
      ],
    //   dynamic: {
    //     "posts:edit": ({userId, postOwnerId}) => {
    //       if (!userId || !postOwnerId) return false;
    //       return userId === postOwnerId;
    //     }
    //   }
    },
    admin: {
      static: [
        // "posts:list",
        // "posts:create",
        // "posts:edit",
        // "posts:delete",
        "users:get",
        "users:getSelf",
        "home-page:visit",
        "profile-page:visit",
        "admin-pages:visit",
        "finance-pages:visit",
      ],
    }
  };
  
  export default rules;