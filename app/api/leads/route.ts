
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate that we have the necessary credentials
    if (!process.env.NOCODB_URL || !process.env.NOCODB_TOKEN || !process.env.NOCODB_TABLE_ID) {
      console.error("Missing NocoDB credentials");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const { email, type, scope, design, budget, locale, name } = body;

    // Map to multiple potential column names to ensure capture
    // NocoDB will ignore keys that don't match defined columns.
    const data = {
        // Name / Title
        title: name || email, 
        Name: name,
        Nombre: name,
        Nombre_Completo: name,

        // Email
        email: email,
        Email: email,
        Correo: email,

        // Project Type
        project_type: type,
        Tipo_Proyecto: type,
        Tipo: type,

        // Scope
        scope: scope,
        Alcance: scope,

        // Design
        design_status: design,
        Diseno: design,
        Design: design,

        // Budget
        budget: budget,
        Presupuesto: budget,

        // Language
        language: locale,
        Idioma: locale,
        
        status: "New",
        Status: "New",
        Estado: "New"
    };

    // Construct the NocoDB API URL
    // Format: {host}/api/v1/db/data/v1/{projectId}/{tableName}
    // Since we only have a table ID/View ID from the URL, we might need to adjust.
    // The user provided: nc/p6r9v50ez13s2ju/mdvacifuxpy3g5o/vwe1l91yatd7pol1/view
    // Let's assume the standard NocoDB API structure for a table.
    // If NOCODB_TABLE_ID is actually a ViewId, we might need a different endpoint.
    // However, usually one writes to a Table.
    // Let's try the standard v2 API if v1 fails, or check the URL structure.
    
    // Based on "nocodb-nitrodb.0fdovo", this looks like a self-hosted instance.
    // Let's try to infer project ID if needed, but usually the API token has access.
    // If the user provided ID is "vwe...", let's assume it's the Table ID.
    // API Route: /api/v2/tables/{tableId}/records
    
    const apiUrl = `${process.env.NOCODB_URL}/api/v2/tables/${process.env.NOCODB_TABLE_ID}/records`;
    
    console.log("DEBUG: Using Table ID:", process.env.NOCODB_TABLE_ID);
    console.log("DEBUG: API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xc-token": process.env.NOCODB_TOKEN
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("NocoDB Error:", response.status, errorText);
      
      try {
          const fs = require('fs');
          const logEntry = `\n\n--- ERROR ${new Date().toISOString()} ---\nID: ${process.env.NOCODB_TABLE_ID}\nURL: ${apiUrl}\nStatus: ${response.status}\nBody: ${errorText}`;
          fs.appendFileSync('C:\\Users\\nelso\\Documents\\Brainware\\brainware-web\\error_log.txt', logEntry);
      } catch (e) {
          console.error("Failed to write error log", e);
      }

      return NextResponse.json({ error: "Failed to submit to NocoDB" }, { status: response.status });
    }

    const result = await response.json();
    
    // Log to file for debugging
    try {
        const fs = require('fs');
        const logEntry = `\n\n--- ${new Date().toISOString()} ---\nID: ${process.env.NOCODB_TABLE_ID}\nURL: ${apiUrl}\nResponse: ${JSON.stringify(result, null, 2)}`;
        fs.appendFileSync('nocodb_debug.log', logEntry);
    } catch (e) {
        console.error("Failed to write log", e);
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
