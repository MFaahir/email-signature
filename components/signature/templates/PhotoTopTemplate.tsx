import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface PhotoTopTemplateProps {
  data: SignatureData;
}

export const PhotoTopTemplate = forwardRef<HTMLDivElement, PhotoTopTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', textAlign: 'center' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {data.logo && (
              <tr>
                <td style={{ paddingBottom: '15px', textAlign: 'center' }}>
                  <img
                    src={data.logo}
                    alt="Profile"
                    style={{ 
                      width: '90px', 
                      height: '90px', 
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: `3px solid ${data.accentColor}`
                    }}
                  />
                </td>
              </tr>
            )}
            <tr>
              <td style={{ textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#000' }}>
                  {data.name}
                </h2>
                <p style={{ margin: '6px 0', fontSize: '14px', color: data.accentColor, fontWeight: '600' }}>
                  {data.title}
                </p>
                {data.company && (
                  <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                    {data.company}
                  </p>
                )}
              </td>
            </tr>
            
            <tr>
              <td style={{ paddingTop: '15px', borderTop: `2px solid ${data.accentColor}`, marginTop: '15px' }}>
                <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%', marginTop: '15px' }}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingBottom: '6px', fontSize: '13px', textAlign: 'center' }}>
                          <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '6px', fontSize: '13px', textAlign: 'center' }}>
                          <a href={`tel:${data.phone}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ fontSize: '13px', textAlign: 'center' }}>
                          <a href={data.website} style={{ color: data.accentColor, textDecoration: 'none', fontWeight: '600' }}>
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
                <td style={{ paddingTop: '15px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: '0 auto' }}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '10px' }}>
                            <a href={data.linkedin} style={{ color: data.accentColor, textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
                              LinkedIn
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '10px' }}>
                            <a href={data.twitter} style={{ color: data.accentColor, textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
                              Twitter
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td>
                            <a href={data.github} style={{ color: data.accentColor, textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
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

PhotoTopTemplate.displayName = "PhotoTopTemplate";
