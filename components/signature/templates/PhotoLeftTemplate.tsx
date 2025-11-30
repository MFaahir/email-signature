import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface PhotoLeftTemplateProps {
  data: SignatureData;
}

export const PhotoLeftTemplate = forwardRef<HTMLDivElement, PhotoLeftTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {data.logo && (
                <td style={{ paddingRight: '25px', verticalAlign: 'top' }}>
                  <img
                    src={data.logo}
                    alt="Profile"
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </td>
              )}
              <td style={{ verticalAlign: 'top' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#000' }}>
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
                
                <table cellPadding="0" cellSpacing="0" border={0} style={{ marginTop: '12px' }}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingBottom: '5px', fontSize: '13px' }}>
                          <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '5px', fontSize: '13px' }}>
                          <a href={`tel:${data.phone}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ fontSize: '13px' }}>
                          <a href={data.website} style={{ color: data.accentColor, textDecoration: 'none' }}>
                            {data.website}
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {(data.linkedin || data.twitter || data.github) && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ marginTop: '12px' }}>
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
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
);

PhotoLeftTemplate.displayName = "PhotoLeftTemplate";
