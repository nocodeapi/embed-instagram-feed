import { html, css, LitElement } from "lit-element";

export class EmbedInstagramFeed extends LitElement {
  static get styles() {
    return css`
      .nc-section {
        font-family: "Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol";
        background-color: #f7fafc;
        padding: 1rem;
      }
      .nc-section a {
        text-decoration: none;
      }
      .nc-container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
      @media (min-width: 640px) {
        .nc-container {
          max-width: 640px;
        }
      }
      @media (min-width: 768px) {
        .nc-container {
          max-width: 768px;
        }
      }
      @media (min-width: 1024px) {
        .nc-container {
          max-width: 1024px;
        }
      }
      @media (min-width: 1280px) {
        .nc-container {
          max-width: 1280px;
        }
      }
      @media (min-width: 1536px) {
        .nc-container {
          max-width: 1536px;
        }
      }

      .nc-title {
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
      }
      .nc-title img {
        width: 38px;
        height: 38px;
        margin-right: 4px;
      }

      .nc-title p {
        font-size: 1.875rem;
        line-height: 2.25rem;
        color: #2d3748;
        font-weight: 600;
        margin: 0;
      }

      .nc-subtitle,
      .nc-caption {
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-bottom: 0.75rem;
      }

      .nc-caption {
        color: #2d3748;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .nc-feed {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;
      }

      @media (min-width: 640px) {
        .nc-feed {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (min-width: 1024px) {
        .nc-feed {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
      }

      .nc-feed-item {
        width: 100%;
        height: 300px;
        background-color: #e2e8f0;
        margin-bottom: 0.5rem;
      }
      .nc-feed-item .nc-insta-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
      .nc-video {
        position: relative;
      }
      .nc-video-player-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 48px;
        width: 48px;
        transform: translate(-50%, -50%);
      }
      .nc-error {
        text-align: center;
        background-color: #fed7d7;
        padding: 1rem 0.5rem;
        border-radius: 0.25rem;
      }
    `;
  }

  static get properties() {
    return {
      url: { type: String },
      title: { type: String },
      subtitle: { type: String },
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.url = "";
    this.title = "Instagram Feed";
    this.subtitle = "Check out our latest feed from instagram";
    this.data = [];
    this.apiError = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.__getFeed();
  }

  async __getFeed() {
    try {
      const res = await fetch(this.url);
      const ncapiResponse = await res.json();
      this.data = ncapiResponse.data;
    } catch (e) {
      this.apiError = true;
      console.error(e);
    }
  }

  render() {
    let htmlTemplate = "";
    if (this.url && this.url.includes("nocodeapi.com")) {
      htmlTemplate = html`
      <section class="nc-section">
        <div class="nc-container" v-if="url">
          <div class="nc-title">
            <p>${this.title}</p>
          </div>
          <p class="nc-subtitle">${this.subtitle}</p>
          <div class="nc-feed">
            ${this.data.map((item) => {
              if (item.media_type === "IMAGE") {
                return html`
                <a target="_blank" rel="noopener" href="${item.permalink}">
                  <div>
                    <div class="nc-feed-item">
                      <img loading="lazy" src="${item.media_url}" alt="${item.caption}" class="nc-insta-image"/>
                    </div>
                    <p class="nc-caption">${item.caption}</p>
                    </div>
                  </div>
                </a>
                `;
              }
              if (item.media_type === "VIDEO") {
                return html`
                <a target="_blank" rel="noopener" href="${item.permalink}">
                  <div class="nc-feed-item nc-video">
                    <img loading="lazy" src="${item.thumbnail_url}" alt="${item.caption}" class="nc-insta-image"/>
                    <img class="nc-video-player-icon" src="https://api.iconify.design/ph:play-circle-fill.svg" height="24" width="24"/>
                  </div>
                  <p class="nc-caption">${item.caption}</p>
                  </div>
                </a>
                `;
              }
            })}
        </div>
      </section>
      `;
    } else {
      htmlTemplate = html`
        <section class="nc-section">
          <div class="nc-error">
            <p>Error: Looks like you havent passed the nocode api endpoint</p>
          </div>
        </section>
      `;
    }
    return htmlTemplate;
  }
}
