import { SignatureData } from "@/lib/types";
import { forwardRef } from "react";

interface NoPhotoTemplateProps {
  data: SignatureData;
}

export const NoPhotoTemplate = forwardRef<HTMLDivElement, NoPhotoTemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} style={{ fontFamily: 'Helvetica, Arial, sans-serif', maxWidth: '500px' }}>
        <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ borderLeft: `4px solid ${data.accentColor}`, paddingLeft: '15px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#000' }}>
                  {data.name}
                </h2>
                <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                  {data.title}
                </p>
                {data.company && (
                  <p style={{ margin: '4px 0', fontSize: '13px', color: '#333', fontWeight: '600' }}>
                    {data.company}
                  </p>
                )}
              </td>
            </tr>
            
            <tr>
              <td style={{ paddingTop: '12px' }}>
                <table cellPadding="0" cellSpacing="0" border={0}>
                  <tbody>
                    {data.email && (
                      <tr>
                        <td style={{ paddingBottom: '4px', fontSize: '12px', color: '#666' }}>
                          <strong>E:</strong>{' '}
                          <a href={`mailto:${data.email}`} style={{ color: '#000', textDecoration: 'none' }}>
                            {data.email}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.phone && (
                      <tr>
                        <td style={{ paddingBottom: '4px', fontSize: '12px', color: '#666' }}>
                          <strong>P:</strong>{' '}
                          <a href={`tel:${data.phone}`} style={{ color: '#000', textDecoration: 'none' }}>
                            {data.phone}
                          </a>
                        </td>
                      </tr>
                    )}
                    {data.website && (
                      <tr>
                        <td style={{ fontSize: '12px', color: '#666' }}>
                          <strong>W:</strong>{' '}
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
                <td style={{ paddingTop: '10px' }}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                      <tr>
                        {data.linkedin && (
                          <td style={{ paddingRight: '12px' }}>
                            <a href={data.linkedin} style={{ color: '#666', textDecoration: 'none', fontSize: '11px' }}>
                              LinkedIn
                            </a>
                          </td>
                        )}
                        {data.twitter && (
                          <td style={{ paddingRight: '12px' }}>
                            <a href={data.twitter} style={{ color: '#666', textDecoration: 'none', fontSize: '11px' }}>
                              Twitter
                            </a>
                          </td>
                        )}
                        {data.github && (
                          <td>
                            <a href={data.github} style={{ color: '#666', textDecoration: 'none', fontSize: '11px' }}>
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

NoPhotoTemplate.displayName = "NoPhotoTemplate";
