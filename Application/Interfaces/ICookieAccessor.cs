
using System;

namespace Application.Interfaces
{
    public interface ICookieAccessor
    {
        string generateCookie(Guid id);
        string getCookie();
    }
}