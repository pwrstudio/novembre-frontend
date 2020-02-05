import sanityClient from '@sanity/client'
import blocksToHtml from '@sanity/block-content-to-html'
import imageUrlBuilder from '@sanity/image-url'
// _lodash
import get from 'lodash/get'
// import remove from 'lodash/remove'
// import fp from 'lodash/fp'

const tracer = x => {
    console.dir(x)
    return x
}

export const client = sanityClient({
    projectId: 'gj963qwj',
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: true // `false` if you want to ensure fresh data
})

const h = blocksToHtml.h

export const renderBlockText = text =>
    blocksToHtml({
        blocks: text,
        serializers: serializers
    })

export const toPlainText = (blocks = []) => {
    return (
        blocks
            .map(block => {
                if (block._type !== 'block' || !block.children) {
                    return ''
                }
                return block.children.map(child => child.text).join('')
            })
            .join('\n\n')
    )
}

const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)

const serializers = {
    marks: {
        link: props =>
            h(
                'a',
                { target: '_blank', rel: 'noreferrer', href: props.mark.href },
                props.children
            )
    },
    types: {
        block: props => {
            const style = props.node.style || 'normal'
            // console.dir(props)
            return style === 'blockquote'
                ? h('blockquote', {}, props.children)
                : h('p', { className: style }, props.children)

        }
    }
}

const sanitizeArticle = res => {
    return {
        id: get(res, '_id', ''),
        editorialState: get(res, 'editorialState', ''),
        title: get(res, 'title', ''),
        mainImage: get(res, 'mainImage', false),
        slug: get(res, 'slug.current', ''),
        publicationDate: get(res, 'publicationDate', ''),
        taxonomy: {
            category: get(res, 'taxonomy.category', ''),
            subCategory: get(res, 'taxonomy.subCategory', ''),
            tags: get(res, 'taxonomy.tags', []),
        },
        related: get(res, 'related', false),
        content: get(res, 'content', []),
        preview: get(res, 'preview[0]', []),
        previewColors: get(res, 'previewColors', []),
        previewVideoUrl: get(res, 'previewVideoUrl', ''),
        relatedSlideshow: get(res, 'relatedSlideshow', {})
    }
}

export const loadArticle = async (query, params) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject(new Error(404));
        }

        let postConstruction = sanitizeArticle(res)

        const linksQuery =
            '*[editorialState == "preview" && (placeAsSidebarInAll || placeAsSidebarInSelected[]._ref == $id)][0]'
        postConstruction.banner = await client.fetch(linksQuery, {
            id: postConstruction.id
        })

        return postConstruction
    } catch (err) {
        Sentry.captureException(err)
        return Promise.reject(new Error(404));
    }
}

export const loadFeed = async (query, params) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject(new Error(404));
        }
        return res
    } catch (err) {
        Sentry.captureException(err)
        return Promise.reject(new Error(404));
    }
}

export const loadPages = async query => {
    try {
        const res = await client.fetch(query, {})
        if (res === null) {
            return Promise.reject(new Error(404));
        }

        return res
    } catch (err) {
        Sentry.captureException(err)
        return Promise.reject(new Error(404));
    }
}