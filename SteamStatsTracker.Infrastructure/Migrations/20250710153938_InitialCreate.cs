using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SteamStatsTracker.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SteamUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SteamId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SteamUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SteamUserStats",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SteamId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCollected = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlaytimeForever = table.Column<double>(type: "float", nullable: false),
                    TotalGames = table.Column<int>(type: "int", nullable: false),
                    SteamLevel = table.Column<int>(type: "int", nullable: false),
                    BadgeCount = table.Column<int>(type: "int", nullable: false),
                    SteamUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SteamUserStats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SteamUserStats_SteamUsers_SteamUserId",
                        column: x => x.SteamUserId,
                        principalTable: "SteamUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OwnedGames",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AppId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlaytimeForever = table.Column<double>(type: "float", nullable: false),
                    SteamUserStatsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnedGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OwnedGames_SteamUserStats_SteamUserStatsId",
                        column: x => x.SteamUserStatsId,
                        principalTable: "SteamUserStats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OwnedGames_SteamUserStatsId",
                table: "OwnedGames",
                column: "SteamUserStatsId");

            migrationBuilder.CreateIndex(
                name: "IX_SteamUsers_SteamId",
                table: "SteamUsers",
                column: "SteamId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SteamUserStats_SteamUserId",
                table: "SteamUserStats",
                column: "SteamUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OwnedGames");

            migrationBuilder.DropTable(
                name: "SteamUserStats");

            migrationBuilder.DropTable(
                name: "SteamUsers");
        }
    }
}
