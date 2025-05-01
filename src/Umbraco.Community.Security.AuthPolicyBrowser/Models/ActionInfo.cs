namespace Umbraco.Community.Security.AuthPolicyBrowser.Models;

public class ActionInfo
{
    public required string Template { get; set; }
    public required string AssemblyName { get; set; }
    public required string AssemblyFullName { get; set; }
    public required string ControllerName { get; set; }
    public required string ActionName { get; set; }
    public required List<string> ControllerPolicies { get; set; }
    public required List<string> ActionPolicies { get; set; }
    public bool ControllerAllowAnonymous { get; set; }
    public bool ActionAllowAnonymous { get; set; }
}
