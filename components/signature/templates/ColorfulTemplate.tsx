import { SignatureData } from "@/lib/types";

export function ColorfulTemplate({ data }: { data: SignatureData }) {
  return (
    <div style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ backgroundColor: data.color, padding: "20px", width: "10px", verticalAlign: "top" }}>
              {/* Decorative bar */}
            </td>
            <td style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Logo"
                    style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "15px", objectFit: "cover" }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "20px", color: data.color }}>
                    {data.fullName}
                  </div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {data.jobTitle} @ {data.company}
                  </div>
                </div>
              </div>
              
              <div style={{ borderTop: "1px solid #ddd", paddingTop: "15px", display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {data.email && (
                  <a href={`mailto:${data.email}`} style={{ color: "#555", textDecoration: "none", display: "flex", alignItems: "center" }}>
                    ✉️ {data.email}
                  </a>
                )}
                {data.phone && (
                  <span style={{ color: "#555", display: "flex", alignItems: "center" }}>
                    📞 {data.phone}
                  </span>
                )}
                {data.website && (
                  <a href={data.website} style={{ color: "#555", textDecoration: "none", display: "flex", alignItems: "center" }}>
                    🌐 {data.website}
                  </a>
                )}
              </div>

              <div style={{ marginTop: "15px" }}>
                 {data.socialLinks.linkedin && (
                  <a href={data.socialLinks.linkedin} style={{ marginRight: "10px", textDecoration: "none", color: data.color, fontWeight: "bold" }}>
                    in
                  </a>
                )}
                {data.socialLinks.twitter && (
                  <a href={data.socialLinks.twitter} style={{ marginRight: "10px", textDecoration: "none", color: data.color, fontWeight: "bold" }}>
                    X
                  </a>
                )}
                {data.socialLinks.instagram && (
                  <a href={data.socialLinks.instagram} style={{ textDecoration: "none", color: data.color, fontWeight: "bold" }}>
                    IG
                  </a>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
