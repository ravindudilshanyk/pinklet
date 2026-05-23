using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using pinklet.data;
using System.Data.Common;
using System.Net;

namespace pinklet.Controllers
{
    [ApiController]
    [Route("db")]
    public class DebugController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DebugController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var tables = await GetTableNamesAsync();
            var rows = new List<string>();

            rows.Add("<html><head><title>Pinklet DB</title><style>body{font-family:Arial,sans-serif;margin:24px;background:#faf7f2;color:#2b2b2b}table{border-collapse:collapse;width:100%;margin-top:16px}th,td{border:1px solid #d9cfc5;padding:10px;text-align:left}th{background:#efe6dc}.card{background:#fff;padding:16px 20px;border:1px solid #e2d8cd;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.04)}a{color:#8b5e3c;text-decoration:none;font-weight:600}</style></head><body>");
            rows.Add("<div class='card'><h1>Pinklet Database</h1><p>Read-only SQLite table view.</p><table><thead><tr><th>Table</th><th>Rows</th><th>Open</th></tr></thead><tbody>");

            foreach (var table in tables)
            {
                var count = await GetRowCountAsync(table);
                rows.Add($"<tr><td>{WebUtility.HtmlEncode(table)}</td><td>{count}</td><td><a href='/db/{WebUtility.UrlEncode(table)}'>View table</a></td></tr>");
            }

            rows.Add("</tbody></table></div></body></html>");
            return Content(string.Join(string.Empty, rows), "text/html");
        }

        [HttpGet("{tableName}")]
        public async Task<IActionResult> Table(string tableName)
        {
            var tables = await GetTableNamesAsync();
            if (!tables.Contains(tableName, StringComparer.OrdinalIgnoreCase))
            {
                return NotFound($"Table '{tableName}' was not found.");
            }

            await using var connection = _context.Database.GetDbConnection();
            if (connection.State != System.Data.ConnectionState.Open)
            {
                await connection.OpenAsync();
            }

            await using var command = connection.CreateCommand();
            command.CommandText = $"SELECT * FROM \"{tableName}\";";

            await using var reader = await command.ExecuteReaderAsync();
            var html = BuildTableHtml(tableName, reader);
            return Content(html, "text/html");
        }

        private async Task<List<string>> GetTableNamesAsync()
        {
            await using var connection = _context.Database.GetDbConnection();
            if (connection.State != System.Data.ConnectionState.Open)
            {
                await connection.OpenAsync();
            }

            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;";

            var tables = new List<string>();
            await using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                tables.Add(reader.GetString(0));
            }

            return tables;
        }

        private async Task<int> GetRowCountAsync(string tableName)
        {
            await using var connection = _context.Database.GetDbConnection();
            if (connection.State != System.Data.ConnectionState.Open)
            {
                await connection.OpenAsync();
            }

            await using var command = connection.CreateCommand();
            command.CommandText = $"SELECT COUNT(*) FROM \"{tableName}\";";

            var result = await command.ExecuteScalarAsync();
            return Convert.ToInt32(result);
        }

        private static string BuildTableHtml(string tableName, DbDataReader reader)
        {
            var html = new List<string>
            {
                "<html><head><title>Pinklet DB</title><style>body{font-family:Arial,sans-serif;margin:24px;background:#faf7f2;color:#2b2b2b}table{border-collapse:collapse;width:100%;margin-top:16px}th,td{border:1px solid #d9cfc5;padding:10px;text-align:left;vertical-align:top}th{background:#efe6dc}.card{background:#fff;padding:16px 20px;border:1px solid #e2d8cd;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.04)}a{color:#8b5e3c;text-decoration:none;font-weight:600}.meta{margin-bottom:8px;color:#6d5a4a}</style></head><body>",
                $"<div class='card'><div class='meta'><a href='/db'>&larr; Back to tables</a></div><h1>{WebUtility.HtmlEncode(tableName)}</h1>"
            };

            var columns = new List<string>();
            for (var i = 0; i < reader.FieldCount; i++)
            {
                columns.Add(reader.GetName(i));
            }

            html.Add("<table><thead><tr>");
            foreach (var column in columns)
            {
                html.Add($"<th>{WebUtility.HtmlEncode(column)}</th>");
            }
            html.Add("</tr></thead><tbody>");

            var rowCount = 0;
            while (reader.Read())
            {
                rowCount++;
                html.Add("<tr>");
                for (var i = 0; i < reader.FieldCount; i++)
                {
                    var value = reader.IsDBNull(i) ? "" : reader.GetValue(i)?.ToString() ?? "";
                    html.Add($"<td>{WebUtility.HtmlEncode(value)}</td>");
                }
                html.Add("</tr>");
            }

            if (rowCount == 0)
            {
                html.Add($"<tr><td colspan='{columns.Count}'>No rows found.</td></tr>");
            }

            html.Add("</tbody></table></div></body></html>");
            return string.Join(string.Empty, html);
        }
    }
}