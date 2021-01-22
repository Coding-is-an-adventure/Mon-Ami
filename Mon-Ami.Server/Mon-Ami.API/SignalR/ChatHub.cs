using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Application.Comments;
using API.Application.Comments.DTOs;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Mon_Ami.API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            string username = GetUsername();

            command.Username = username;

            CommentDTO comment = await _mediator.Send(command);

            await Clients.Group(command.ActivityId.ToString()).SendAsync("ReceiveComment", comment);
        }

        private string GetUsername()
        {
            return Context
                        .User?
                        .Claims?
                        .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task AddToGroup(string groupname)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupname);

            await Clients.Group(groupname).SendAsync("Send", $"{GetUsername()} has joined the group");
        }

        public async Task RemoveFromGroup(string groupname)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupname);

            await Clients.Group(groupname).SendAsync("Send", $"{GetUsername()} has left the group");
        }
    }
}
