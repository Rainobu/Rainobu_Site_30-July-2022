using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
    public class LikeStoryRepository : ILikeStoryRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public LikeStoryRepository(DataContext context, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _context = context;

        }

        public void DeleteStoryLiked(UserStory userStory)
        {
            _context.LikeStory.Remove(userStory);
        }

        public Task<IEnumerable<LikeStoryDto>> GetStoryLikedUser(int userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<StoryDto>> GetStoryLikes(LikeStoryParams likeStoryParams)
        {
            var storylike = _context.Stories.AsQueryable();
            var like = _context.LikeStory.AsQueryable();

            like = like.Where(like => like.SourceUserId == likeStoryParams.UserId);
            storylike = like.Select(like => like.LikedStory);
            return await PagedList<StoryDto>.CreateAsync(storylike.ProjectTo<StoryDto>(_mapper.ConfigurationProvider, new { CurrentUserId = likeStoryParams.UserId }).AsNoTracking(), likeStoryParams.PageNumber, likeStoryParams.PageSize);
            // var likedStory = storylike
            //                 .Where(s => s.Deleted ==false)
            //                 .Select(slike => new LikeStoryDto
            // {
            //     storyId = slike.Id,
            //     storyName = slike.StoryName,
            //     genre = slike.Genre,
            //     username = slike.UserName,
            //     imageUrl = slike.ImageUrl,
            //     Rating = slike.Rating,
            //     TotalRate = slike.Ratings.Count
            // });
            // return await PagedList<LikeStoryDto>.CreateAsync(likedStory,
            //     likeStoryParams.PageNumber, likeStoryParams.PageSize);
        }


        public async Task<AppUser> GetStoryWithLikeStory(int userId)
        {
            return await _context.Users
                 .Include(x => x.LikedStoryByUsers)
                 .FirstOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<UserStory> GetUserLikeStory(int sourceUserId, int likedstoryId)
        {
            return await _context.LikeStory.FindAsync(sourceUserId, likedstoryId);
        }
    }
}