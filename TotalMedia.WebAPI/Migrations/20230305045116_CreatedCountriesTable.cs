using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TotalMedia.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreatedCountriesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Locale = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Currency = table.Column<string>(type: "nchar(3)", fixedLength: true, maxLength: 3, nullable: false),
                    VATs = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Currency", "Locale", "Name", "VATs" },
                values: new object[,]
                {
                    { (byte)1, "EUR", "fr-FR", "France", "5.5;20;10" },
                    { (byte)2, "GBP", "en-GB", "United Kingdom", "5;20" },
                    { (byte)3, "EUR", "pt-PT", "Portugal", "6;13;23" },
                    { (byte)4, "EUR", "es-ES", "Spain", "21;10" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
