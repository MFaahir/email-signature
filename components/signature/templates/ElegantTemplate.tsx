import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface ElegantTemplateProps {
  data: SignatureData;
}

export const ElegantTemplate = forwardRef<HTMLDivElement, ElegantTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Palatino, Georgia, serif', maxWidth: '550px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', border: '1px solid #e0e0e0', padding: '20px' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Logo"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      objectFit: 'contain',
                      marginBottom: '10px'
                    }}
                  />
                )}
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#2c2c2c', letterSpacing: '1px' }}>
                  {data.name}
                </h2>
                <p style={{ margin: '6px 0', fontSize: '13px', color: data.accentColor, fontStyle: 'italic', letterSpacing: '0.5px' }}>
                  {data.title}
                </p>
                {data.company && (
                  <p style={{ margin: '4px 0', fontSize: '12px', color: '#666', letterSpacing: '0.5px' }}>
                    {data.company}
                  </p>
                )}
              </td>
            </tr>
            
            <tr>
              <td style={{ paddingTop: '15px', textAlign: 'center' }}>
                <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingBottom: '6px', fontSize: '12px', color: '#555' }}>
                          <a href={`mailto:${data.email}`} style={{ color: '#2c2c2c', textDecoration: 'none' }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '6px', fontSize: '12px', color: '#555' }}>
                          <a href={`tel:${data.phone}`} style={{ color: '#2c2c2c', textDecoration: 'none' }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ fontSize: '12px' }}>
                          <a href={data.website} style={{ color: data.accentColor, textDecoration: 'none' }}>
                            {data.website}
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>

            {(data.linkedin || data.twitter || data.github) && (
              <tr>
                <td style={{ paddingTop: '15px', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '15px auto 0' }}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '15px' }}>
                            <a href={data.linkedin} style={{ color: '#666', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.5px' }}>
                              LinkedIn
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '15px' }}>
                            <a href={data.twitter} style={{ color: '#666', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.5px' }}>
                              Twitter
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td>
                            <a href={data.github} style={{ color: '#666', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.5px' }}>
                              GitHub
                            </a>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

ElegantTemplate.displayName = "ElegantTemplate";
