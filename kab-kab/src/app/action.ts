"use server";

import { Session } from "@/backend/types/session";
import { ShownPost } from "@/components/public/Post";
import prisma from "@/lib/db";
import { getServerSession } from "@/utils/auth";

export async function likePost(userId: number, postId: number) {
  const likedPost = await prisma.user_Like_Post.create({
    data: {
      userID: userId,
      postID: postId,
    },
  });
  const postAnalytic = await prisma.post_Analytic.findFirst({
    where: {
      id: postId,
    },
  });
  const updatePostAnalytic = await prisma.post_Analytic.update({
    where: {
      id: postId, // Replace `postId` with the actual unique identifier of the post
    },
    data: {
      likes: (postAnalytic?.likes ?? 0) + 1,
    },
  });
  console.log(likedPost);
  console.log(postAnalytic);
  console.log(updatePostAnalytic);
}

export async function unLikePost(userId: number, postId: number) {
  const unlikePost = await prisma.user_Like_Post.delete({
    where: {
      userID_postID: {
        userID: userId,
        postID: postId,
      },
    },
  });
  const postAnalytic = await prisma.post_Analytic.findFirst({
    where: {
      id: postId,
    },
  });
  const updatePostAnalytic = await prisma.post_Analytic.update({
    where: {
      id: postId, // Replace `postId` with the actual unique identifier of the post
    },
    data: {
      likes: (postAnalytic?.likes ?? 0) - 1,
    },
  });
  console.log(unlikePost);
  console.log(postAnalytic);
  console.log(updatePostAnalytic);
}
export async function bookmarkPost(userId: number, postId: number) {
  const bookmarkPost = await prisma.user_BookmarK_Post.create({
    data: {
      userID: userId,
      postID: postId,
    },
  });

  console.log(bookmarkPost);
}
export async function unBookmarkPost(userId: number, postId: number) {
  const unbookmarkPost = await prisma.user_BookmarK_Post.delete({
    where: {
      userID_postID: {
        userID: userId,
        postID: postId,
      },
    },
  });

  console.log(unbookmarkPost);
}
export async function getAllPosts(session: Session) {
  if (session) {
    const posts = await prisma.post.findMany({
      where: {
        NOT: {
          authorID: session.userId,
        },
      },
      include: {
        User_Like_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_BookmarK_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_Repost_Post: {
          where: {
            userID: session?.userId,
          },
        },
        author: {
          select: {
            name: true,
            username: true,
            id: true,
            imageURL: true,
          },
        },
        Post_Analytic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPosts = posts.map((post) => {
      return {
        authorName: post.author.name,
        authorUsername: post.author.username,
        content: post.content ?? "",
        bookmarked: post.User_BookmarK_Post.length > 0,
        liked: post.User_Like_Post.length > 0,
        reposted: post.User_Repost_Post.length > 0,
        replied: false,
        likes: post.Post_Analytic?.likes,
        reposts: post.Post_Analytic?.reposts,
        replies: post.Post_Analytic?.replies,
        postId: post.id,
        authorId: post.author.id,
        postDate: post.createdAt,
        imageURL: post.author.imageURL,
      };
    });

    return formattedPosts as ShownPost[];
  }
  return null;
}

export async function getProfile(userId: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      username: true,
      name: true,
      profile: true,
      createdAt: true,
    },
  });
  if (!user) return null;
  const formattedProfile = {
    ...user.profile,
    name: user.name,
    username: user.username,
  };
  return formattedProfile;
}

export async function getAllPostsByUser(userId: number) {
  const session = await getServerSession();
  if (session) {
    const posts = await prisma.post.findMany({
      where: {
        authorID: userId,
      },
      include: {
        User_Like_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_BookmarK_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_Repost_Post: {
          where: {
            userID: session?.userId,
          },
        },
        author: {
          select: {
            name: true,
            username: true,
            id: true,
            imageURL: true,
          },
        },
        Post_Analytic: true,
      },
    });
    const formattedPosts = posts.map((post) => {
      return {
        authorName: post.author.name,
        authorUsername: post.author.username,
        content: post.content ?? "",
        bookmarked: post.User_BookmarK_Post.length > 0,
        liked: post.User_Like_Post.length > 0,
        reposted: post.User_Repost_Post.length > 0,
        replied: false,
        likes: post.Post_Analytic?.likes,
        reposts: post.Post_Analytic?.reposts,
        replies: post.Post_Analytic?.replies,
        imageURL: post.author.imageURL,
        postId: post.id,
        authorId: post.author.id,
        postDate: post.createdAt,
      };
    });
    return formattedPosts as ShownPost[];
  }
  return null;
}

export async function getPost(postID: number, session: Session) {
  if (session) {
    const post = await prisma.post.findFirst({
      where: {
        id: postID,
      },
      include: {
        User_Like_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_BookmarK_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_Repost_Post: {
          where: {
            userID: session?.userId,
          },
        },
        author: {
          select: {
            name: true,
            username: true,
            id: true,
            imageURL: true,
          },
        },
        Post_Analytic: true,
      },
    });
    if (!post) return null;
    const formattedPost = {
      authorName: post.author.name,
      authorUsername: post.author.username,
      content: post.content ?? "",
      bookmarked: post.User_BookmarK_Post.length > 0,
      liked: post.User_Like_Post.length > 0,
      reposted: post.User_Repost_Post.length > 0,
      replied: false,
      likes: post.Post_Analytic?.likes,
      reposts: post.Post_Analytic?.reposts,
      replies: post.Post_Analytic?.replies,
      imageURL: post.author.imageURL,
      postId: post.id,
      authorId: post.author.id,
      postDate: post.createdAt,
    };

    return formattedPost as ShownPost;
  }
  return null;
}

export async function getPostThread(parentPostID: number, session: Session) {
  if (session) {
    const posts = await prisma.post.findMany({
      where: {
        parentPostID: parentPostID,
      },
      include: {
        User_Like_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_BookmarK_Post: {
          where: {
            userID: session?.userId,
          },
        },
        User_Repost_Post: {
          where: {
            userID: session?.userId,
          },
        },
        author: {
          select: {
            name: true,
            username: true,
            id: true,
            imageURL: true,
          },
        },
        Post_Analytic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const formattedPosts = posts.map((post) => {
      return {
        authorName: post.author.name,
        authorUsername: post.author.username,
        content: post.content ?? "",
        bookmarked: post.User_BookmarK_Post.length > 0,
        liked: post.User_Like_Post.length > 0,
        reposted: post.User_Repost_Post.length > 0,
        replied: false,
        likes: post.Post_Analytic?.likes,
        reposts: post.Post_Analytic?.reposts,
        replies: post.Post_Analytic?.replies,
        imageURL: post.author.imageURL,
        postId: post.id,
        authorId: post.author.id,
        postDate: post.createdAt,
      };
    });
    return formattedPosts as ShownPost[];
  }
  return null;
}

export async function getAllFollowing(userID: number, session: Session) {
  if (session) {
    const following = await prisma.follow.findMany({
      where: {
        followerID: userID,
      },
    });
    return following;
  }
  return null;
}

export async function isFollowing(
  followerID: number,
  followedID: number,
  session: Session
): Promise<boolean> {
  if (session) {
    const following = await prisma.follow.findFirst({
      where: {
        followedID: followedID,
        followerID: followerID,
      },
    });
    return following != null;
  }
  return false;
}

export async function getAllFollower(userID: number, session: Session) {
  if (session) {
    const followers = await prisma.follow.findMany({
      where: {
        followedID: userID,
      },
    });
    return followers;
  }
  return null;
}

export async function getRecommendedUsers(session: Session) {
  if (session) {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            NOT: {
              id: session.userId,
            },
          },
          {
            NOT: {
              followedBy: {
                none: {
                  followerID: session.userId, // Ensure the user is not already followed by the current user
                },
              },
            },
          },
        ],
      },
      select: {
        username: true,
        name: true,
        imageURL: true,
        profile: {
          select: {
            bio: true,
          },
        },
      },
    });
    console.log(users)
    return users;
  }
  return null;
}
