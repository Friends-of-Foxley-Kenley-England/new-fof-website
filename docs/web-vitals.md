# Web vitals

Web vitals are being tracked for all traffic using reshepe. It currently has a free tier.

https://reshepe.dev/features/web-vitals
https://docs.reshepe.dev/web-vitals/introduction
https://docs.reshepe.dev/web-vitals/javascript

### Config

reshepe web vitals will only track if `GATSBY_RESHEPE_PUBLIC_KEY` env var is set to the correct public key. This should only be set in PROD, though for troubleshooting we can set the env var locally in the `.env` file.

I tried the react package `@reshepe-web-vitals/react` but it required `react-router-dom` npm package as well. I tried adding it as a peer dependency, but that still didn't work. I didn't want to install `react-router-dom` just for reshepe.

I found that the toolbar didn't work. It loaded the toolbar but with empty stats, and no error in the console. I tried changing the script from defer to async to not specified, and still didn't work

### reshepe dashboards

- [project home](https://dashboard.reshepe.dev/projects/39)
- [Web vitals](https://dashboard.reshepe.dev/projects/39/web-vitals)
- [Speed insights](https://dashboard.reshepe.dev/projects/39/speed-insights)
