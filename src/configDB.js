//Arquivo de configuração do banco de dados, importado diretamente da documentação do sqlite no npm
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function openDb () {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}