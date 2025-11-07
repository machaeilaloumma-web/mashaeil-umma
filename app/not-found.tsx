export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          flexDirection: "column",
          backgroundColor: "#0d1117",
          color: "#f0f6fc",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>404</h1>
        <p style={{ fontSize: "1.25rem" }}>Page Not Found</p>
      </body>
    </html>
  );
}
