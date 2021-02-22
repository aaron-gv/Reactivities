using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public ProfileParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .OrderBy(d => d.Date)
                    .AsQueryable();

                switch (request.Params.predicate as string)
                {
                    case "past":
                        query = query.Where(x => x.Attendees.Any(a => a.AppUser.UserName == request.Username) && x.Date < DateTime.Today);
                        break;
                    case "isHost":
                        query = query.Where(x => x.HostUsername == request.Username);
                        break;
                    default:
                        query = query.Where(x => x.Attendees.Any(a => a.AppUser.UserName == request.Username) && x.Date >= DateTime.Today);
                        break;
                }


                return Result<List<UserActivityDto>>.Success(await query.ToListAsync());
            }
        }
    }
}