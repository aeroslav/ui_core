<% var keys = _.keys(data.el);
_.each(keys, function (key, i){ %>
    <<%=data.tags[i]%> class='searchResult-<%=key%>'><%=data.el[key]%></<%=data.tags[i]%>>
<% }); %>