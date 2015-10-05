package crm.empresacomercial.data.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

public class ClientesDB {
	private static final Logger LOGGER = Logger.getLogger(ClientesDB.class);

	private static String dbURL = "jdbc:hsqldb:file:C:/bancoCrm/crm";
	private static String tableName = "tb_cliente";
	private static Connection conn = null;
	private static Statement stmt = null;

	private static void createConnection() {
		try {
			Class.forName("org.hsqldb.jdbcDriver").newInstance();
			// Get a connection
			conn = DriverManager.getConnection(dbURL);
		} catch (Exception except) {
			LOGGER.error(except);
		}
	}

	private static void insertClientes(int id, String nmCliente, String email) {
		try {
			stmt = conn.createStatement();
			stmt.execute("insert into " + tableName + " values (" + id + ",'"
					+ nmCliente + "','" + email + "')");
			stmt.close();
		} catch (SQLException sqlExcept) {
			LOGGER.error(sqlExcept);
		}
	}

	private static void selectClientes() {
		try {
			stmt = conn.createStatement();
			ResultSet results = stmt.executeQuery("select * from " + tableName);
			ResultSetMetaData rsmd = results.getMetaData();
			int numberCols = rsmd.getColumnCount();
			for (int i = 1; i <= numberCols; i++) {
				// print Column Names
				System.out.print(rsmd.getColumnLabel(i) + "\t\t");
			}

			System.out
			.println("\n-------------------------------------------------");

			while (results.next()) {
				int id = results.getInt(1);
				String nmCliente = results.getString(2);
				String email = results.getString(3);
				System.out.println(id + "\t\t" + nmCliente + "\t\t" + email);
			}
			results.close();
			stmt.close();
		} catch (SQLException sqlExcept) {
			LOGGER.error(sqlExcept);
		}
	}

	private static void shutdown() {
		try {
			if (stmt != null) {
				stmt.close();
			}
			if (conn != null) {
				DriverManager.getConnection(dbURL + ";shutdown=true");
				conn.close();
			}
		} catch (SQLException sqlExcept) {
			LOGGER.error(sqlExcept);
		}
	}

}
