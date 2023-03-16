PRINT '>>> Iniciando script 15_03_2023_DDL.sql...'
GO

IF NOT EXISTS (SELECT ID FROM SYSOBJECTS WHERE ID = OBJECT_ID('dbo.cd'))
BEGIN
	CREATE TABLE CD (
		cd_id int IDENTITY(0, 1) PRIMARY KEY,
		nome varchar(300),
		autor varchar(300),
		data_criacao DateTime
	)
END
GO

IF NOT EXISTS (SELECT ID FROM SYSOBJECTS WHERE ID = OBJECT_ID('dbo.musica'))
BEGIN
	CREATE TABLE MUSICA (
		musica_id int IDENTITY(0, 1) PRIMARY KEY,
		cd_id int FOREIGN KEY REFERENCES cd(cd_id),
		nome_musica varchar(300),
		tempo_segundos int
	)
END
GO

PRINT '>>> Final do script 15_03_2023_DDL.sql...'
GO