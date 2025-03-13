import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ToDoList from './ToDoList.vue';

describe('ToDoList Component', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ToDoList);
    expect(wrapper.exists()).toBe(true);
  });

  it('adds a new todo item', async () => {
    const wrapper = shallowMount(ToDoList);
    const input = wrapper.find('input');
    await input.setValue('New Todo');
    await wrapper.find('button').trigger('click.prevent');
    expect(wrapper.findAll('ul > li')).toHaveLength(1);
  });
});