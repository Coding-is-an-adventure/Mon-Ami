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
            string username = Context
                             .User?
                             .Claims?
                             .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            command.Username = username;

            CommentDTO comment = await _mediator.Send(command);

            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}
