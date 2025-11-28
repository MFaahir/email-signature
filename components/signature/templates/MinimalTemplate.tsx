import { SignatureData } from "@/lib/types";

export function MinimalTemplate({ data }: { data: SignatureData }) {
  return (
    <div style={{ fontFamily: "Helvetica, sans-serif", fontSize: "14px", color: "#444" }}>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td style={{ borderLeft: `3px solid ${data.color}`, paddingLeft: "15px" }}>
              <div style={{ fontWeight: "bold", fontSize: "18px", color: "#000" }}>
                {data.fullName}
              </div>
              <div style={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "1px", marginBottom: "10px", color: data.color }}>
                {data.jobTitle}
              </div>
              <div style={{ fontSize: "13px" }}>
                {data.company}
              </div>
              <div style={{ marginTop: "10px", fontSize: "13px" }}>
                {data.email && (
                  <span style={{ marginRight: "10px" }}>
                    <a href={`mailto:${data.email}`} style={{ color: "#444", textDecoration: "none" }}>{data.email}</a>
                  </span>
                )}
                {data.phone && <span>{data.phone}</span>}
              </div>
              {data.website && (
                <div style={{ marginTop: "5px", fontSize: "13px" }}>
                  <a href={data.website} style={{ color: data.color, textDecoration: "none", fontWeight: "bold" }}>
                    {data.website}
                  </a>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
