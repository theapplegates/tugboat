import pluginWebc from "@11ty/eleventy-plugin-webc";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImagePlugin } from "@11ty/eleventy-img";
import emojiShortName from "emoji-short-name";
import { parseHTML } from "linkedom";

export default function(eleventyConfig) {
	eleventyConfig.ignores.add("./README.md");
	eleventyConfig.addWatchTarget("./_components/**/*.css");

	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: {
			"tabindex": "0"
		}
	});

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/eleventy-img/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	eleventyConfig.addPlugin(eleventyImagePlugin, {
		formats: ["webp", "jpeg"],
		urlPath: "/img/",

		defaultAttributes: {
			loading: "lazy",
			decoding: "async"
		}
	});

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	eleventyConfig.addJavaScriptFunction("emojiShortName", (emoji) => {
		return emojiShortName[emoji];
	});

	eleventyConfig.addJavaScriptFunction("selectFromHtml", (html, selector) => {
		const { document } = parseHTML(html);
		return document.querySelectorAll(selector);
	});
};
