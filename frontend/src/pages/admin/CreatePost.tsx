  import { useCallback, useState } from 'react'

  import RichTextEditor, { BaseKit } from 'reactjs-tiptap-editor'
  import {
    Box,
    Button,
    ButtonGroup,
    Textarea,
    useColorMode,
    useColorModeValue,
    VStack,
    Container,
    Stack,
    Input, 
    Select, 
    FormControl, 
    FormLabel,
  } from '@chakra-ui/react';

  import { locale } from 'reactjs-tiptap-editor/locale-bundle'
  import {
    BubbleMenuTwitter,
    BubbleMenuKatex,
    BubbleMenuExcalidraw,
    BubbleMenuMermaid,
    BubbleMenuDrawer
  } from 'reactjs-tiptap-editor/bubble-extra';

  import { Attachment } from 'reactjs-tiptap-editor/attachment';
  import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
  import { Bold } from 'reactjs-tiptap-editor/bold';
  import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
  import { Clear } from 'reactjs-tiptap-editor/clear';
  import { Code } from 'reactjs-tiptap-editor/code';
  import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
  import { Color } from 'reactjs-tiptap-editor/color';
  import { ColumnActionButton } from 'reactjs-tiptap-editor/multicolumn';
  import { Emoji } from 'reactjs-tiptap-editor/emoji';
  import { ExportPdf } from 'reactjs-tiptap-editor/exportpdf';
  import { ExportWord } from 'reactjs-tiptap-editor/exportword';
  import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
  import { FontSize } from 'reactjs-tiptap-editor/fontsize';
  import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter';
  import { Heading } from 'reactjs-tiptap-editor/heading';
  import { Highlight } from 'reactjs-tiptap-editor/highlight';
  import { History } from 'reactjs-tiptap-editor/history';
  import { HorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
  import { Iframe } from 'reactjs-tiptap-editor/iframe';
  import { Image } from 'reactjs-tiptap-editor/image';
  import { ImageGif } from 'reactjs-tiptap-editor/imagegif';
  import { ImportWord } from 'reactjs-tiptap-editor/importword';
  import { Indent } from 'reactjs-tiptap-editor/indent';
  import { Italic } from 'reactjs-tiptap-editor/italic';
  import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
  import { Link } from 'reactjs-tiptap-editor/link';
  import { Mention } from 'reactjs-tiptap-editor/mention';
  import { MoreMark } from 'reactjs-tiptap-editor/moremark';
  import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
  import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
  import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand';
  import { Strike } from 'reactjs-tiptap-editor/strike';
  import { Table } from 'reactjs-tiptap-editor/table';
  import { TableOfContents } from 'reactjs-tiptap-editor/tableofcontent';
  import { TaskList } from 'reactjs-tiptap-editor/tasklist';
  import { TextAlign } from 'reactjs-tiptap-editor/textalign';
  import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
  import { Video } from 'reactjs-tiptap-editor/video';
  import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
  import { Katex } from 'reactjs-tiptap-editor/katex';
  import { Drawer } from 'reactjs-tiptap-editor/drawer';
  import { Excalidraw } from 'reactjs-tiptap-editor/excalidraw';
  import { Twitter } from 'reactjs-tiptap-editor/twitter';
  import { Mermaid } from 'reactjs-tiptap-editor/mermaid';

  import 'reactjs-tiptap-editor/style.css';

  import { PostCreate } from '../../types/post';
  import useRealEstateStore from '../../stores';
  import { toast } from 'sonner';
  import { uploadImagesTiptap } from '../../utils/uploadImagesTiptap';


  function convertBase64ToBlob(base64: string) {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  const extensions = [
    BaseKit.configure({
      placeholder: {
        showOnlyCurrent: true,
      },
      characterCount: {
        limit: 50_000,
      },
    }),
    History,
    SearchAndReplace,
    TableOfContents,
    FormatPainter.configure({ spacer: true }),
    Clear,
    FontFamily,
    Heading.configure({ spacer: true }),
    FontSize,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    MoreMark,
    Emoji,
    Color.configure({ spacer: true }),
    Highlight,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
    Indent,
    LineHeight,
    TaskList.configure({
      spacer: true,
      taskItem: {
        nested: true,
      },
    }),
    Link,
    Image.configure({
      upload: async (file: File) => {
      console.log('Uploading file:', file);
      try {
        const imageUrl = await uploadImagesTiptap(file);
        console.log('Upload success, URL:', imageUrl);
        return imageUrl;
      } catch (error) {
        console.error('Upload thất bại:', error);
        return '';
      }
    },
  }),
    Video.configure({
      upload: (files: File) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(URL.createObjectURL(files))
          }, 500)
        })
      },
    }),
    Blockquote,
    SlashCommand,
    HorizontalRule,
    Code.configure({
      toolbar: false,
    }),
    CodeBlock,
    ColumnActionButton,
    Table,
    Iframe,
    ExportPdf.configure({ spacer: true }),
    ImportWord.configure({
      upload: (files: File[]) => {
        const f = files.map(file => ({
          src: URL.createObjectURL(file),
          alt: file.name,
        }))
        return Promise.resolve(f)
      },
    }),
    ExportWord,
    TextDirection,
    Mention,
    Attachment.configure({
      upload: (file: any) => {
        // fake upload return base 64
        const reader = new FileReader()
        reader.readAsDataURL(file)

        return new Promise((resolve) => {
          setTimeout(() => {
            const blob = convertBase64ToBlob(reader.result as string)
            resolve(URL.createObjectURL(blob))
          }, 300)
        })
      },
    }),

    Katex,
    Excalidraw,
    Mermaid.configure({
      upload: (file: any) => {
        // fake upload return base 64
        const reader = new FileReader()
        reader.readAsDataURL(file)

        return new Promise((resolve) => {
          setTimeout(() => {
            const blob = convertBase64ToBlob(reader.result as string)
            resolve(URL.createObjectURL(blob))
          }, 300)
        })
      },
    }),
    Drawer.configure({
      upload: (file: any) => {
        // fake upload return base 64
        const reader = new FileReader()
        reader.readAsDataURL(file)

        return new Promise((resolve) => {
          setTimeout(() => {
            const blob = convertBase64ToBlob(reader.result as string)
            resolve(URL.createObjectURL(blob))
          }, 300)
        })
      },
    }),
    Twitter,
  ]

  const DEFAULT = ``

  function debounce(func: any, wait: number) {
    let timeout: NodeJS.Timeout
    return function (...args: any[]) {
      clearTimeout(timeout)
      // @ts-ignore
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  function Editor() {
    const { createPost } = useRealEstateStore()
    const [content, setContent] = useState(DEFAULT)
    const [theme, setTheme] = useState('light')
    const [disable, setDisable] = useState(false)

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<string | null>(null);
    const [tags, setTags] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

    const onValueChange = useCallback(
      debounce((value: any) => {
        setContent(value)
      }, 300),
      [],
    )

    const { toggleColorMode } = useColorMode();
    const bg = useColorModeValue('white', 'gray.800');

    const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const url = await uploadImagesTiptap(file);
        setThumbnailUrl(url);
        toast.success('Tải ảnh thumbnail thành công!');
      } catch (error) {
        toast.error('Tải ảnh thumbnail thất bại!');
      }
    };

    const handleImageUpload = async (file: File) => {
      try {
        const url = await uploadImagesTiptap(file);
        setImageUrls((prev) => [...prev, url]); 
        return url;
      } catch (error) {
        console.error('Upload thất bại:', error);
        return '';
      }
    };

    const handleSubmit = async () => {
      const post: PostCreate = {
        title,
        content,
        category,
        image_url: thumbnailUrl ? [thumbnailUrl] : [],
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      };
      try {
        const response = await createPost(post);
        toast.success('Bài đăng đã được gửi thành công!');
        // Reset form fields
        setTitle('');
        setContent(DEFAULT);
        setCategory(null);
        setTags('');
        setImageUrls([]);
        } catch (error) {
        console.error('Lỗi khi gửi bài đăng:', error);
      }
    };

    return (  
      <Box py="24" px="5" bg={bg} overflowY={"auto"} maxH={"80vh"}>
        <Container maxW="4xl">
          <Stack direction="row" spacing={3} mb={4} wrap="wrap" flexWrap="wrap">
            <Button onClick={() => locale.setLang('vi')}>Vietnamese</Button>
            <Button onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
              toggleColorMode();
            }}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </Stack>

          <VStack spacing={4} mb={6}>
            <FormControl>
              <FormLabel>Tiêu đề</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài đăng"
              />
            </FormControl>

            <FormControl>
            <FormLabel>Ảnh thumbnail</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
            />
            {thumbnailUrl && (
              <Box mt={2}>
                <img src={thumbnailUrl} alt="Thumbnail preview" style={{ maxWidth: 200, borderRadius: 8 }} />
              </Box>
            )}
            </FormControl>

            <FormControl>
              <FormLabel>Danh mục</FormLabel>
              <Select
                value={category || ''}
                onChange={(e) => setCategory(e.target.value || null)}
                placeholder="Chọn danh mục"
              >
                <option value="News">Tin Tức</option>
                <option value="Lifestyle">Phong cách sống</option>
                <option value="Education">Giáo dục</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Thẻ (phân cách bằng dấu phẩy)</FormLabel>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Nhập thẻ, ví dụ: công nghệ, lập trình"
              />
            </FormControl>
          </VStack>

          <RichTextEditor
            output="html"
            content={content}
            onChangeContent={onValueChange}
            extensions={extensions}
            dark={theme === 'dark'}
            disabled={disable}
            bubbleMenu={{
              render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
                return (
                  <>
                    {bubbleDefaultDom}
                    {extensionsNames.includes('twitter') && (
                      <BubbleMenuTwitter editor={editor} disabled={disabled} key="twitter" />
                    )}
                    {extensionsNames.includes('katex') && (
                      <BubbleMenuKatex editor={editor} disabled={disabled} key="katex" />
                    )}
                    {extensionsNames.includes('excalidraw') && (
                      <BubbleMenuExcalidraw editor={editor} disabled={disabled} key="excalidraw" />
                    )}
                    {extensionsNames.includes('mermaid') && (
                      <BubbleMenuMermaid editor={editor} disabled={disabled} key="mermaid" />
                    )}
                    {extensionsNames.includes('drawer') && (
                      <BubbleMenuDrawer editor={editor} disabled={disabled} key="drawer" />
                    )}
                  </>
                );
              },
            }}
          />
          <Button colorScheme="blue" onClick={handleSubmit} mt={4} isDisabled={!title || !content}>
              Gửi bài đăng
          </Button>

          {typeof content === 'string' && (
            <Textarea
              readOnly
              mt={6}
              h="500px"
              borderRadius="md"
              p={4}
              value={content}
              fontSize="sm"
              bg={useColorModeValue('gray.50', 'gray.700')}
            />
          )}
        </Container>
      </Box>
    );
  };

  export default Editor;