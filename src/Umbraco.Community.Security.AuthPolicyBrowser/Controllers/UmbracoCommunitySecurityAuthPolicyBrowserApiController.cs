using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Umbraco.Community.Security.AuthPolicyBrowser.Models;

namespace Umbraco.Community.Security.AuthPolicyBrowser.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Umbraco.Community.Security.AuthPolicyBrowser")]
    public class UmbracoCommunitySecurityAuthPolicyBrowserApiController : UmbracoCommunitySecurityAuthPolicyBrowserApiControllerBase
    {
        private readonly IActionDescriptorCollectionProvider _actionDescriptorCollectionProvider;

        public UmbracoCommunitySecurityAuthPolicyBrowserApiController(
            IActionDescriptorCollectionProvider actionDescriptorCollectionProvider)
        {
            _actionDescriptorCollectionProvider = actionDescriptorCollectionProvider;
        }

        [HttpGet("actions")]
        [ProducesResponseType<List<ActionInfo>>(StatusCodes.Status200OK)]
        public List<ActionInfo> GetActions()
        {
            return _actionDescriptorCollectionProvider.ActionDescriptors.Items
                .OfType<ControllerActionDescriptor>()
                .Select(CreateActionInfo)
                .ToList();
        }

        private ActionInfo CreateActionInfo(ControllerActionDescriptor actionDescriptor)
        {
            var defaultPolicyName = "Default";

            var template = actionDescriptor.AttributeRouteInfo?.Template ?? "";
            var assemblyName = actionDescriptor.ControllerTypeInfo.Assembly.GetName().Name ?? "";
            var assemblyFullName = actionDescriptor.ControllerTypeInfo.Assembly.FullName ?? "";

            // Get auth attributes set at controller level
            var controllerName = actionDescriptor.ControllerName;
            var controllerAttributes = actionDescriptor.ControllerTypeInfo.GetCustomAttributes(true);
            var controllerPolicies = controllerAttributes
                .OfType<AuthorizeAttribute>()
                .Select(x => x.Policy ?? defaultPolicyName)
                .ToList();
            var controllerAllowAnonymous = controllerAttributes
                .OfType<AllowAnonymousAttribute>()
                .Any();

            // Get action method
            var actionName = actionDescriptor.ActionName;
            var actionMethod = actionDescriptor.MethodInfo;

            // Get auth attributes set at method (action) level
            var actionAttributes = actionMethod.GetCustomAttributes(true);
            var actionPolicies = actionAttributes
                .OfType<AuthorizeAttribute>()
                .Select(x => x.Policy ?? defaultPolicyName)
                .ToList();
            var actionAllowAnonymous = actionAttributes
                .OfType<AllowAnonymousAttribute>()
                .Any();

            return new ActionInfo
            {
                Template = template,
                AssemblyName = assemblyName,
                AssemblyFullName = assemblyFullName,
                ControllerName = controllerName,
                ControllerPolicies = controllerPolicies,
                ControllerAllowAnonymous = controllerAllowAnonymous,
                ActionName = actionName,
                ActionPolicies = actionPolicies,
                ActionAllowAnonymous = actionAllowAnonymous
            };
        }
    }
}
