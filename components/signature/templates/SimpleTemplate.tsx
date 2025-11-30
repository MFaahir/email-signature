import { SignatureData } from "@/lib/types";

export function SimpleTemplate({ data }: { data: SignatureData }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#333" }}>
      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            {data.logo && (
              <td style={{ paddingRight: "15px", verticalAlign: "top" }}>
                <img
                  src={data.logo}
                  alt="Logo"
                  style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                />
              </td>
            )}
            <td style={{ verticalAlign: "top" }}>
              <div style={{ fontWeight: "bold", fontSize: "16px", color: data.accentColor }}>
                {data.name}
              </div>
              <div style={{ fontSize: "14px", marginBottom: "8px" }}>
                {data.title} | {data.company}
              </div>
              <div style={{ fontSize: "13px", lineHeight: "1.4" }}>
                {data.email && (
                  <div>
                    <a href={`mailto:${data.email}`} style={{ color: data.accentColor, textDecoration: "none" }}>
                      {data.email}
                    </a>
                  </div>
                )}
                {data.phone && <div>{data.phone}</div>}
                {data.website && (
                  <div>
                    <a href={data.website} style={{ color: data.accentColor, textDecoration: "none" }}>
                      {data.website}
                    </a>
                  </div>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                {data.linkedin && (
                  <a href={data.linkedin} style={{ marginRight: "10px", textDecoration: "none", color: data.accentColor }}>
                    LinkedIn
                  </a>
                )}
                {data.twitter && (
                  <a href={data.twitter} style={{ marginRight: "10px", textDecoration: "none", color: data.accentColor }}>
                    Twitter
                  </a>
                )}
                {data.github && (
                  <a href={data.github} style={{ textDecoration: "none", color: data.accentColor }}>
                    GitHub
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
