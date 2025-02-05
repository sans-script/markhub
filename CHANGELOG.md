# [1.3.0](https://github.com/sans-script/markhub/compare/v1.2.0...v1.3.0) (2025-02-01)


### Bug Fixes

* correct CSS syntax for scrollbar thumb hover state ([5acbed4](https://github.com/sans-script/markhub/commit/5acbed400d991f5b3e38a4d2507db3247809905e))


### Features

* add dynamic page component to render home with fileId from params ([31afb5d](https://github.com/sans-script/markhub/commit/31afb5d439503a1e3f627bce423e433f84909fdf))
* add persistent state management for editor dimensions using localStorage ([5b9b206](https://github.com/sans-script/markhub/commit/5b9b206c25bb1c1776faeedaf7ddfda0c7417d82))
* enhance home component with loading overlay and ai-generated file naming ([e7b5bc9](https://github.com/sans-script/markhub/commit/e7b5bc939422ce210c7f72aa5f96567830741afb))
* implement file loading and sidebar resizing functionality in Sidebar component ([b44c3f1](https://github.com/sans-script/markhub/commit/b44c3f17e3ef22ce931d4b27ef65c2421d40b7a6))
* update metadata for improved SEO and add title and description tags ([fa35bbf](https://github.com/sans-script/markhub/commit/fa35bbf92734ae5ca427e312a2c26b3400b87d36))

# [1.2.0](https://github.com/sans-script/markhub/compare/v1.1.0...v1.2.0) (2025-01-31)


### Features

* add Hello World endpoint and configure Vercel deployment ([304a363](https://github.com/sans-script/markhub/commit/304a3638b629abce47e1a0a1c753ca5d9f0c8d2c))

# [1.1.0](https://github.com/sans-script/markhub/compare/v1.0.0...v1.1.0) (2025-01-31)


### Bug Fixes

* update sidebar content comment to english for better clarity ([d924b34](https://github.com/sans-script/markhub/commit/d924b34d424ca7810c9709a97bcabae4227ec578))


### Features

* add api with express and google generative ai integration ([d082e13](https://github.com/sans-script/markhub/commit/d082e13d4e158adf83166be569bfc38ad010195c))
* add axios dependency to package.json and package-lock.json ([81664d4](https://github.com/sans-script/markhub/commit/81664d4bde2a906ed1f7320b6c927694f8aa17dc))
* add custom hooks for managing editor dimensions, settings, status, and toast notifications ([333c2e2](https://github.com/sans-script/markhub/commit/333c2e24110177833eaa4e3521a74457ca30bfc7))
* add toggle for typing effect in Menu component ([457d4d9](https://github.com/sans-script/markhub/commit/457d4d9bf164b4c32eb5114efbf32deae68b1f4e))
* enhance editor component with scroll position synchronization and resizing improvements ([0e4634e](https://github.com/sans-script/markhub/commit/0e4634e91fba94810c4c4677cd7078d911487d5f))
* enhance preview component with scroll position handling and wrap markdown tables in divs ([94d986c](https://github.com/sans-script/markhub/commit/94d986c7ec7d9ae550da9b6ee5c2c0d1370f674a))
* enhance toast component with responsive design and improved visibility handling ([f07b3d1](https://github.com/sans-script/markhub/commit/f07b3d18691bd32f661f14d70ca1e5c2d4a6327b))
* implement typing effect and error handling in InputField component with toast notifications ([729c517](https://github.com/sans-script/markhub/commit/729c51731d4ad4eb37a5031200e9ff9a52362404))
* refactor Home component to use custom hooks for state management and improve toast notifications ([c52920c](https://github.com/sans-script/markhub/commit/c52920c253806c4f9480530771379130c9b5090f))

# 1.0.0 (2025-01-28)


### Bug Fixes

* add document checks to prevent errors in cursor style handling during resizing ([4c6593c](https://github.com/sans-script/markhub/commit/4c6593cde2077433b5aa7e8f0e6fa0321b8e6e94))
* add null check for window object in Preview component to prevent errors during server-side rendering ([1b9fcb5](https://github.com/sans-script/markhub/commit/1b9fcb597f095c9a83d8e877663e26f2aa8271cb))
* adjust bottom div height transition value ([c0e8c25](https://github.com/sans-script/markhub/commit/c0e8c2528dd52612f6f91bf08370805cdc440489))
* adjust right positioning of the resize handle in the Editor component ([eb86ae4](https://github.com/sans-script/markhub/commit/eb86ae4531e1de1c9bc52733625a30bcd7a35fa1))
* increase bottom div height threshold for resizing logic ([3f13b90](https://github.com/sans-script/markhub/commit/3f13b90dbe8918cb7d8ec20f5d9a08f436648ff5))
* remove commented code in ErrorBoundary component for clarity ([cc13bb1](https://github.com/sans-script/markhub/commit/cc13bb1f899eeb18948826988d423ef86f328304))
* remove commented code in Toast component for clarity ([7fe43ef](https://github.com/sans-script/markhub/commit/7fe43ef93e49c9218bd13be26bea36a737c923ee))
* remove unnecessary document checks for cursor style handling during resizing ([64420b8](https://github.com/sans-script/markhub/commit/64420b87be3a6fba1a5a242c68669475cca1bcde))
* remove unnecessary document checks for cursor style handling in Sidebar component ([57a015e](https://github.com/sans-script/markhub/commit/57a015eecf780d76055e8bd5bd5f221ecac75124))
* streamline cursor style handling during resizing by removing unnecessary document checks ([8c82a69](https://github.com/sans-script/markhub/commit/8c82a697db956f4b89a305e3852daf42f4a3200d))


### Features

* add editor capabilities guide with support for Markdown, LaTeX, Mermaid diagrams, tables, and footnotes ([9c2a1f5](https://github.com/sans-script/markhub/commit/9c2a1f5a61aaf984bb73be1caa3a9c8298c442b6))
* add ErrorBoundary component to handle rendering errors with toast notifications ([e3fb464](https://github.com/sans-script/markhub/commit/e3fb464598122865ffb985990dcec0a0f240a770))
* add Sidebar component with resizing functionality ([a5c8168](https://github.com/sans-script/markhub/commit/a5c816820c8e613e3c99a955c3445c996eef7f87))
* add Toast component for displaying success and error messages with transitions ([0e0bbf4](https://github.com/sans-script/markhub/commit/0e0bbf46c8db54eeba68c3d4cea2d5303f12c256))
* add touch support for resizing editor and input field components ([db0076e](https://github.com/sans-script/markhub/commit/db0076ecbc4a943b293599610e4d32997eee1842))
* enhance Preview component to support Mermaid syntax conversion and improve padding ([1078eb0](https://github.com/sans-script/markhub/commit/1078eb0d0d4dc111c6f6c5d81f882868917dff55))
* enhance resizing functionality and update input handling for Shift + Enter ([4ade018](https://github.com/sans-script/markhub/commit/4ade01819be11cc35adee85210fb28b301fd0e86))
* implement sidebar toggle functionality and enhance resizing logic ([8e0c3ce](https://github.com/sans-script/markhub/commit/8e0c3ce7f2e826a1651f50619349b3a419c77344))
* integrate Toast notifications and ErrorBoundary for improved error handling and user feedback ([19b5c65](https://github.com/sans-script/markhub/commit/19b5c659279a673d4a9eaa2454ae03a81ec63d08))
* update input handling to use Ctrl + Enter for submission in InputField component ([0d44a74](https://github.com/sans-script/markhub/commit/0d44a7491a815d4b1b6853106f12420b45cfb87b))
